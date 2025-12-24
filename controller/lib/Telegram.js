import axiosInstance from './axios.js';
import VideoStat from "../../models/VideoStat.js";

function formatDuration(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}h ${m}m ${s}s`;
}

async function sendMessage(messageObj, text) {
    return axiosInstance.get("sendMessage", {
        chat_id: messageObj.chat.id,
        text
    });
}

export default async function HandleMessage(messageObj) {
    const chatId = messageObj.chat.id;

    // 🎥 VIDEO
    if (messageObj.video) {
        const duration = messageObj.video.duration;

        const stats = await VideoStat.findOneAndUpdate(
            { chatId },
            { $inc: { count: 1, totalSeconds: duration } },
            { upsert: true, new: true }
        );

        return sendMessage(
            messageObj,
            `🎥 Video added!
📹 Videos: ${stats.count}
⏱ This video: ${formatDuration(duration)}
📊 Total duration: ${formatDuration(stats.totalSeconds)}`
        );
    }

    // 📝 COMMANDS
    if (messageObj.text?.startsWith("/")) {
        const cmd = messageObj.text.slice(1);

        if (cmd === "total") {
            const stats = await VideoStat.findOne({ chatId }) || {
                count: 0,
                totalSeconds: 0
            };

            return sendMessage(
                messageObj,
                `📊 Video Summary
📹 Total videos: ${stats.count}
📐 Average length: ${stats.count
                    ? formatDuration(stats.totalSeconds / stats.count)
                    : "0h 0m 0s"
                }
⏱ Total time: ${formatDuration(stats.totalSeconds)}`
            );
        }

        if (cmd === "reset") {
            await VideoStat.deleteOne({ chatId });
            return sendMessage(messageObj, "🔄 Stats reset");
        }
        if (cmd === "info") {
           return sendMessage(
                        messageObj,
                        `📹 Video Length Calculator Bot

• Send or forward videos to calculate their duration
• /total → Show total length of all videos
• /reset → Reset and start a new calculation
• /help → Show help message

👨‍💻 Created by GS Bishwasa © All rights reserved ${new Date().getFullYear()}`
                    );
        }



        if (cmd === "start") {
            return sendMessage(messageObj,
                `
                        🎬 Video Length Calculator Bot

Easily calculate total watch time of multiple videos.

✨ Features:
• Auto-detect video duration
• Total & average length
• Playback time (0.5x – 2x)

🚀 Commands:
• /total – Show summary
• /reset – Start new calculation
• /info – About this bot

👨‍💻 Created by GS Bishwasa
© All rights reserved ${new Date().getFullYear()}
                        `
            );
        }
        if (cmd === "help") {
            return sendMessage(messageObj, '/total\n/reset\n/info');
        }
    }

    return sendMessage(messageObj, "Send me videos 📹");
}

