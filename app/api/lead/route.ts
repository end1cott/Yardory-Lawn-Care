import { NextRequest, NextResponse } from 'next/server'
import { calcPriceRange } from '@/lib/validators'
import FormData from 'form-data'

const TELEGRAM_BOT_TOKEN = '7440074610:AAHKSB8gYTgOjVunA-xagLQeObGeLVeHQOo'
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '6742290226' // Using your provided chat ID

interface LeadData {
  name: string
  phone: string
  email: string
  address: string
  city: string
  zip: string
  lot: '0.1' | '0.25' | '0.5'
  freq: 'weekly' | 'bi-weekly' | 'one-time'
  services: ('mow' | 'edge' | 'hedge' | 'bagging')[]
  contactPreference: 'phone' | 'email'
  phonePreference?: 'call' | 'sms'
  notes: string
  photos?: string[] // Base64 encoded images
}

async function sendToTelegram(data: LeadData) {
  // Check if chat ID is configured
  if (!TELEGRAM_CHAT_ID || TELEGRAM_CHAT_ID === 'YOUR_CHAT_ID') {
    console.log('Telegram chat ID not configured. Skipping Telegram notification.')
    return { ok: true, skipped: true }
  }

  const message = formatTelegramMessage(data)
  
  try {
    // Send the main message first
    const messageResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    })

    if (!messageResponse.ok) {
      const errorData = await messageResponse.json().catch(() => ({}))
      console.error('Telegram API error:', messageResponse.status, errorData)
      throw new Error(`Telegram API error: ${messageResponse.status} - ${errorData.description || 'Unknown error'}`)
    }

    const messageResult = await messageResponse.json()
    console.log('Telegram message sent successfully:', messageResult)

    // Send photos if any
    if (data.photos && data.photos.length > 0) {
      for (let i = 0; i < data.photos.length; i++) {
        const photo = data.photos[i]
        try {
          // Convert base64 to buffer
          const base64Data = photo.replace(/^data:image\/[a-z]+;base64,/, '')
          const buffer = Buffer.from(base64Data, 'base64')
          
          // Create form data for photo upload
          const formData = new FormData()
          formData.append('chat_id', TELEGRAM_CHAT_ID)
          formData.append('caption', `📸 Lawn Photo ${i + 1} from ${data.name}`)
          formData.append('photo', buffer, {
            filename: `lawn_photo_${i + 1}.jpg`,
            contentType: 'image/jpeg'
          })

          const photoResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
            method: 'POST',
            body: formData,
          })

          if (!photoResponse.ok) {
            console.error(`Failed to send photo ${i + 1}:`, photoResponse.status)
          } else {
            console.log(`Photo ${i + 1} sent successfully`)
          }
        } catch (photoError) {
          console.error(`Error sending photo ${i + 1}:`, photoError)
        }
      }
    }

    return messageResult
  } catch (error) {
    console.error('Error sending to Telegram:', error)
    // Don't throw error, just log it so the form submission still succeeds
    return { ok: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

function formatTelegramMessage(data: LeadData): string {
  const lotSizes = {
    '0.1': 'Small (≤ 0.1 acre)',
    '0.25': 'Medium (≤ 0.25 acre)', 
    '0.5': 'Large (≤ 0.5 acre)'
  }

  const frequencies = {
    'weekly': 'Weekly',
    'bi-weekly': 'Bi-weekly',
    'one-time': 'One-time'
  }

  const serviceNames = {
    'mow': 'Mowing',
    'edge': 'Edging', 
    'hedge': 'Hedge Trimming',
    'bagging': 'Bagging'
  }

  const servicesList = data.services.map(s => serviceNames[s]).join(', ')
  
  // Calculate price range
  const priceRange = calcPriceRange(data)
  const avgPrice = Math.round((priceRange.from + priceRange.to) / 2)

  return `
🌱 <b>NEW LAWN CARE QUOTE REQUEST</b>

👤 <b>Contact Information:</b>
• Name: ${data.name}
• Phone: ${data.phone}
• Email: ${data.email}

📞 <b>Contact Preference:</b>
• Preferred Method: ${data.contactPreference === 'phone' ? '📞 Phone' : '📧 Email'}
${data.contactPreference === 'phone' && data.phonePreference ? `• Phone Preference: ${data.phonePreference === 'call' ? '📞 Call' : '💬 SMS'}` : ''}

📍 <b>Property Details:</b>
• Address: ${data.address}
• City: ${data.city}
• ZIP: ${data.zip}
• Lot Size: ${lotSizes[data.lot]}
• Frequency: ${frequencies[data.freq]}

🔧 <b>Services Requested:</b>
• ${servicesList}

💰 <b>Price Estimate:</b>
• Range: $${priceRange.from}–$${priceRange.to}
• <b>Average: $${avgPrice}</b>

📝 <b>Additional Notes:</b>
${data.notes || 'No additional notes provided'}

📸 <b>Photos:</b> ${data.photos && data.photos.length > 0 ? `${data.photos.length} photo(s) attached` : 'No photos provided'}

⏰ <b>Submitted:</b> ${new Date().toLocaleString()}
🌐 <b>Source:</b> Website Quote Form
  `.trim()
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log('LEAD:', body)

    // Send to Telegram (this won't fail the request if Telegram is not configured)
    const telegramResult = await sendToTelegram(body)

    // Always return success for the form submission
    return NextResponse.json({ 
      ok: true, 
      message: 'Quote request submitted successfully!',
      telegram: telegramResult.skipped ? 'not_configured' : telegramResult.ok ? 'sent' : 'failed'
    })
  } catch (e) {
    console.error('Error processing lead:', e)
    return NextResponse.json({ 
      ok: false, 
      error: 'Failed to submit quote request' 
    }, { status: 500 })
  }
}


