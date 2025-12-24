import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
import handler from './controller/lib/index.js';
import connectDB from './db.js';
import axios from 'axios';

await connectDB();

app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'Bot is running',
    timestamp: new Date().toISOString()
  });
});

// Webhook endpoint for Telegram
app.post('/webhook', async (req, res) => {
  console.log('Received update:', req.body);
  res.sendStatus(200); // Reply instantly to Telegram
  
  // Process in background
  try {
    await handler(req.body);
  } catch (error) {
    console.error('Handler error:', error);
  }
});

// Setup webhook (call this once after deployment)
app.get('/setup-webhook', async (req, res) => {
  try {
    const webhookUrl = `${process.env.APP_URL}/webhook`;
    const response = await axios.get(
      `https://api.telegram.org/bot${process.env.MY_TOKEN}/setWebhook`,
      {
        params: {
          url: webhookUrl
        }
      }
    );
    res.json({
      message: 'Webhook setup',
      webhookUrl,
      telegramResponse: response.data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check webhook status
app.get('/webhook-info', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.telegram.org/bot${process.env.MY_TOKEN}/getWebhookInfo`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 Webhook endpoint: /webhook`);
});