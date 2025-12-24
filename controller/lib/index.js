import HandleMessage from "./Telegram.js";

export default async function handler(update) {
  if (!update.message) return;
  await HandleMessage(update.message);
}