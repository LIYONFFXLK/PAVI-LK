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
  try {
    const { q, reply, from, quoted } = mek;

    if (!q || q.trim() === "") {
      return reply("❌ *Please provide a song name or YouTube link*");
    }

    console.log("Search Query:", q);  // 🔍 Debug

    const search = await yts(q);
    console.log("Search Result:", search);  // 🔍 Debug

    if (!search.videos || !search.videos.length) {
      return reply("❌ No results found.");
    }

    const data = search.videos[0];
    const url = data.url;

    const desc = `
🎵 *Title:* ${data.title}
🕒 *Duration:* ${data.timestamp}
📤 *Uploaded:* ${data.ago}
👀 *Views:* ${data.views.toLocaleString()}
🔗 *Watch:* ${url}
`;

    await pavi.sendMessage(from, {
      image: { url: data.thumbnail },
      caption: desc,
    }, { quoted });

  } catch (err) {
    console.error("❌ Error in song command:", err);
    mek.reply("❌ Error fetching the song. Please try again.");
  }
});
