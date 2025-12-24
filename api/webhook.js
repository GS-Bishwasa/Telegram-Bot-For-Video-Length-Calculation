import connectDB from "../db.js";
import handler from "../controller/lib/index.js";

let isConnected = false;

export default async function webhook(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("Telegram Bot is running 🚀");
  }

  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }

  const update = req.body;

  res.sendStatus(200); // respond instantly to Telegram

  await handler(update); // ✅ THIS is correct
}
