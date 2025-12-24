import connectDB from "../db.js";
import handler from "../controller/lib/index.js";

export default async function webhook(req, res) {
  // 1. Only allow POST requests from Telegram
  if (req.method !== "POST") {
    return res.status(200).send("Telegram Bot is running 🚀");
  }

  try {
    // 2. Ensure Database is connected
    await connectDB();

    // 3. Process the update FIRST
    const update = req.body;
    if (update) {
      await handler(update);
    }

    // 4. Send 200 OK only AFTER the logic is done
    return res.status(200).json({ status: "success" });
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    // Still send 200 to Telegram to prevent them from retrying infinitely 
    // unless you want Telegram to retry on failure.
    return res.status(200).send("Error handled");
  }
}