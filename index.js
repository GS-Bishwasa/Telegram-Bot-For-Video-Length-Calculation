import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
import handler from './controller/lib/index.js';
import connectDB from './db.js';
await connectDB();

app.use(express.json());



app.get('/', async (req, res) => {
 res.send("Telegram Bot")
 console.log("Telegram Bot")
 res.send(await handler(req));
});

app.post('/', (req, res) => {
  console.log(req.body)
  res.sendStatus(200);          // reply instantly

  // process in background
  handler(req.body).catch(console.error);
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});