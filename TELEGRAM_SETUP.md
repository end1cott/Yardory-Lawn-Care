# Telegram Bot Setup Guide

## 🚀 Quick Setup

### 1. Get Your Chat ID

1. **Start a chat with your bot** in Telegram
2. **Send any message** to the bot (like "Hello")
3. **Visit this URL** in your browser:
   ```
   https://api.telegram.org/bot7440074610:AAHKSB8gYTgOjVunA-xagLQeObGeLVeHQOo/getUpdates
   ```
4. **Look for your chat ID** in the response - it will be in the `chat.id` field
5. **Copy the number** (it will look something like `123456789`)

### 2. Set Environment Variable

Create a `.env.local` file in your project root with:

```env
TELEGRAM_CHAT_ID=YOUR_CHAT_ID_HERE
```

Replace `YOUR_CHAT_ID_HERE` with the number you copied.

### 3. Test the Integration

1. **Restart your development server** after adding the environment variable
2. **Submit a test quote** from your website
3. **Check your Telegram** - you should receive a formatted message!

## 📱 What You'll Receive

When someone submits a quote form, you'll get a nicely formatted message like:

```
🌱 NEW LAWN CARE QUOTE REQUEST

👤 Contact Information:
• Name: John Doe
• Phone: (555) 123-4567
• Email: info@mowjet.com

📍 Property Details:
• Address: 123 Main St
• City: Philadelphia
• ZIP: 19123
• Lot Size: ≤ 0.25 acre
• Frequency: Bi-weekly

🔧 Services Requested:
• Mowing, Edging, Hedge Trimming

💰 Price Estimate:
• Range: $45–$65
• Average: $55

📝 Additional Notes:
Customer mentioned gate code: 1234

⏰ Submitted: 12/26/2024, 2:30:45 PM
🌐 Source: Website Quote Form
```

## 💰 Price Calculation

The system automatically calculates:
- **Price Range**: Based on lot size, frequency, and services
- **Average Price**: The middle point of the range for easy quoting
- **Service Breakdown**: Shows which services were selected

This helps you quickly determine what price to quote to customers!

## 🔧 Troubleshooting

### Bot not responding?
- Make sure you've started a chat with your bot
- Verify the bot token is correct
- Check that you've set the TELEGRAM_CHAT_ID correctly

### Not receiving messages?
- Restart your development server after adding the environment variable
- Check the browser console for any errors
- Verify the chat ID is correct

### Need to test the bot?
Visit: `http://localhost:3000/api/telegram-setup` to verify your bot configuration.

## 🎯 Next Steps

Once set up, every quote form submission will be sent directly to your Telegram with price estimates, so you can respond quickly to potential customers with accurate pricing!
