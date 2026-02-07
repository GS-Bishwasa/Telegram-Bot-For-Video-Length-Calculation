# 🎥 Video Length Calculator Telegram Bot

A powerful **Telegram bot** that automatically calculates the **total watch time, average duration, and playback time** of multiple videos — perfect for students, binge-watchers, content creators, and course planners.

🚀 **Live Bot:** [@video_length_testing_bot](https://t.me/video_length_testing_bot)  
🌐 **Backend Deployed On:** Railway  
🗄 **Database:** MongoDB Atlas  
⚡ **Webhook-based (No polling)**

---

## ✨ What This Bot Does

This bot helps you calculate how much **time you actually need** to watch a collection of videos.

Simply **send videos** to the bot — it does the rest automatically.

### ✅ Core Features

- 🎬 Auto-detect video duration  
- 📊 Total number of videos  
- ⏱ Total watch time  
- 📐 Average video length  
- ⏩ Playback time calculation  
  - 0.5x  
  - 1.0x  
  - 1.5x  
  - 2.0x  
- 👤 User-specific data  
- 💾 Persistent storage (data survives server restarts)  
- 🔄 Reset stats anytime  
- 🌍 Cloud deployed & scalable  

---

## 🧠 How It Works

1. User sends a video to the bot  
2. Bot reads the video duration from Telegram metadata  
3. Data is saved **per user** in MongoDB  
4. Bot replies with updated stats  
5. Commands like `/total` instantly fetch data from the database  

---

## 🤖 Bot Commands

| Command | Description |
|------|------------|
| `/total` | Show total videos, total time, average length & playback durations |
| `/reset` | Reset your personal video stats |
| `/help` | Show all available commands |
| `/info` | About the bot |

---

## 📸 Example Use Case

> You are watching a course with 40 videos  
> You want to know:
- Total hours required  
- Time needed at 1.5x speed  
- Average video length  

👉 Just forward all videos to the bot and run `/total`.

---

## 🧩 Tech Stack

- Node.js  
- Express  
- MongoDB Atlas  
- Mongoose  
- Telegram Bot API  
- Axios  
- Railway (Deployment)  

---


---

## 🔐 Environment Variables

Create a `.env` file:

```env
BOT_TOKEN=your_telegram_bot_token
BASE_URL=https://api.telegram.org/bot
MONGO_URI=your_mongodb_atlas_uri
APP_URL=https://your-app-name.railway.app
```
## 🔗 Set Telegram Webhook (One-Time Setup)

To connect your Telegram bot with the deployed backend, you need to **set the webhook URL once**.

Use **Postman** (or a browser) and make a **GET request** to the following URL:
```
https://api.telegram.org/bot
<YOUR_BOT_TOKEN>/setWebhook?url=https://telegram-bot-for-vercel-production.up.railway.app/webhook
```

