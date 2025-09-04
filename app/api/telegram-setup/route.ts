import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

const TELEGRAM_BOT_TOKEN = '7440074610:AAHKSB8gYTgOjVunA-xagLQeObGeLVeHQOo'

export async function GET(_req: NextRequest) {
  try {
    // Get bot info to verify token
    const botInfoResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`)
    const botInfo = await botInfoResponse.json()

    if (!botInfo.ok) {
      return NextResponse.json({ 
        error: 'Invalid bot token',
        details: botInfo
      }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      botInfo: botInfo.result,
      instructions: [
        '1. Start a chat with your bot in Telegram',
        '2. Send any message to the bot',
        '3. Visit: https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + '/getUpdates',
        '4. Look for "chat" -> "id" in the response',
        '5. Copy that number and set it as TELEGRAM_CHAT_ID in your environment variables'
      ]
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to verify bot token',
      details: error
    }, { status: 500 })
  }
}
