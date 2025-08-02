const { cmd } = require('../command');
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');

cmd({
  pattern: "song",
  alias: ["song", "downloadsong"],
  react: "🎵",
  desc: "Download Song",
  category: "download",
  filename: __filename,
}, 
async (pavi, mek) => {
  let { q, reply } = mek;

  try {
    if (!q) return reply("❌ *Please provide a song name or YouTube link*");

    const search = await yts(q);
    const data = search.videos[0];
    const url = data.url;

    const desc = `
🎵 *Title:* ${data.title}
🕒 *Duration:* ${data.timestamp}
📤 *Uploaded:* ${data.ago}
👀 *Views:* ${data.views.toLocaleString()}
🔗 *Watch Here:* ${data.url}
`;

    await pavi.sendMessage(mek.from, {
      image: { url: data.thumbnail },
      caption: desc,
    }, { quoted: mek });

    // Duration limit check (30 mins max)
    const durationParts = data.timestamp.split(':').map(Number);
    let totalSeconds = 0;
    if (durationParts.length === 3) {
      totalSeconds = durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2];
    } else if (durationParts.length === 2) {
      totalSeconds = durationParts[0] * 60 + durationParts[1];
    } else {
      totalSeconds = durationParts[0];
    }

    if (totalSeconds > 1800) {
      return reply("❌ *Sorry, audio files longer than 30 minutes are not supported.*");
    }

    // Download audio using ytdl-core
    const tempFile = path.join(__dirname, `${data.title.replace(/[^\w\s]/gi, '')}.mp3`);
    await new Promise((resolve, reject) => {
      ytdl(url, { filter: 'audioonly' })
        .pipe(fs.createWriteStream(tempFile))
        .on('finish', resolve)
        .on('error', reject);
    });

    await pavi.sendMessage(mek.from, {
      audio: { url: tempFile },
      mimetype: 'audio/mpeg'
    }, { quoted: mek });

    // Optionally delete file after sending
    fs.unlinkSync(tempFile);

  } catch (err) {
    console.error(err);
    reply("❌ *An error occurred while processing your request.*");
  }
});
