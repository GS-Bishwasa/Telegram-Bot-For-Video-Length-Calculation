import axiosInstance from './axios.js';
import VideoStat from "../../models/VideoStat.js";



const videoStats = {
    count: 0,
    totalSeconds: 0
};

function formatDuration(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
}

async function sendMessage(messageObj, messageText) {
    return axiosInstance.get('sendMessage', {
        chat_id: messageObj.chat.id,
        text: messageText,
    });
}

export default async function HandleMessage(messageObj) {

    // 🎥 VIDEO HANDLING
    if (messageObj.video) {
        const duration = messageObj.video.duration;
        const chatId = messageObj.chat.id;

        const stats = await VideoStat.findOneAndUpdate(
            { chatId },
            {
                $inc: {
                    count: 1,
                    totalSeconds: duration
                }
            },
            { upsert: true, new: true }
        );


        videoStats.count += 1;
        videoStats.totalSeconds += duration;

        return sendMessage(
            messageObj,
            //             `🎥 Video added!
            // 📹 Videos: ${videoStats.count}
            // ⏱ This video: ${formatDuration(duration)}
            // 📊 Total duration: ${formatDuration(videoStats.totalSeconds)}`
            `🎥 Video added!
📹 Videos: ${stats.count}
⏱ This video: ${formatDuration(duration)}
📊 Total duration: ${formatDuration(stats.totalSeconds)}`
        );
    }

    // 📝 TEXT HANDLING
    if (messageObj.text) {
        const messageText = messageObj.text;

        if (messageText.startsWith('/')) {
            const command = messageText.slice(1);

            switch (command) {
//                 case 'total':
//                     return sendMessage(
//                         messageObj,
//                         `📊 Video Summary
// 📹 Total videos: ${videoStats.count}

// 📐 Average length: ${videoStats.count
//                             ? formatDuration(Math.floor(videoStats.totalSeconds / videoStats.count))
//                             : '0h 0m 0s'
//                         }

// ⏱ Total time needed: ${formatDuration(videoStats.totalSeconds)}

// ▶️ Playback durations:
// • 0.5x : ${formatDuration(Math.floor(videoStats.totalSeconds / 0.5))}
// • 1.0x : ${formatDuration(videoStats.totalSeconds)}
// • 1.5x : ${formatDuration(Math.floor(videoStats.totalSeconds / 1.5))}
// • 2.0x : ${formatDuration(Math.floor(videoStats.totalSeconds / 2))}
// `
//                     );


                case 'start':
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


case 'total': {

  const stats = await VideoStat.findOne({
    chatId: messageObj.chat.id
  }) || { count: 0, totalSeconds: 0 };

  const average =
    stats.count > 0
      ? formatDuration(Math.floor(stats.totalSeconds / stats.count))
      : '0h 0m 0s';

  return sendMessage(
    messageObj,
    `📊 Video Summary

📹 Total videos: ${stats.count}

📐 Average length: ${average}

⏱ Total time needed: ${formatDuration(stats.totalSeconds)}

▶️ Playback durations:
• 0.5x → ${formatDuration(Math.floor(stats.totalSeconds / 0.5))}
• 1.0x → ${formatDuration(stats.totalSeconds)}
• 1.5x → ${formatDuration(Math.floor(stats.totalSeconds / 1.5))}
• 2.0x → ${formatDuration(Math.floor(stats.totalSeconds / 2))}
`
  );
}


                case 'help':
                    return sendMessage(messageObj, '/total\n/reset\n/info');

                case 'info':
                    return sendMessage(
                        messageObj,
                        `📹 Video Length Calculator Bot

• Send or forward videos to calculate their duration
• /total → Show total length of all videos
• /reset → Reset and start a new calculation
• /help → Show help message

👨‍💻 Created by GS Bishwasa © All rights reserved ${new Date().getFullYear()}`
                    );



                // case 'reset':
                //     videoStats.count = 0;
                //     videoStats.totalSeconds = 0;
                //     return sendMessage(messageObj, '🔄 Video stats reset.');

                case 'reset':
                    await VideoStat.deleteOne({ chatId: messageObj.chat.id });
                    return sendMessage(messageObj, '🔄 Your video stats have been reset.');


                default:
                    return sendMessage(messageObj, `Unknown command: ${cmd}`);
            }
        }

        return sendMessage(messageObj, 'Send me videos to calculate total time.');
    }

    // OTHER MESSAGE TYPES
    return sendMessage(messageObj, 'Unsupported message type.');
}
