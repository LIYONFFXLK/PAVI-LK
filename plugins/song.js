const { cmd } = require('../command');
const yts = require('yt-search');

cmd({
  pattern: "song",
  alias: ["song"],
  desc: "Get song info",
  category: "test",
  filename: __filename,
},
async (pavi, mek) => {
  const { q, reply } = mek;

  if (!q || q.trim() === "") {
    return reply("❌ Please type a song name.");
  }

  console.log("✅ User query:", q);

  try {
    const search = await yts(q);
    if (!search.videos || !search.videos.length) {
      return reply("❌ No songs found.");
    }

    const song = search.videos[0];

    const info = `
🎶 *Title:* ${song.title}
⏱️ *Duration:* ${song.timestamp}
📺 *Channel:* ${song.author.name}
🔗 *Link:* ${song.url}
    `;

    return reply(info);

  } catch (err) {
    console.error("❌ Error:", err);
    return reply("❌ Error while searching song.");
  }
});
