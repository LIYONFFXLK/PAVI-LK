const { cmd } = require("../command");
const yts = require("yt-search");

cmd(
  {
    pattern: "yts",
    alias: ["yts", "youtubesearch"],
    react: "🔎",
    desc: "Search YouTube videos",
    category: "search",
    filename: __filename,
  },
  async (
    pavi,
    mek,
    m,
    {
      from,
      quoted,
      q,
      reply,
    }
  ) => {
    try {
      if (!q) return reply("*Please provide a search query!* 🔍");

      reply("*Searching YouTube for you...* ⌛");

      const search = await yts(q);

      if (!search || !search.all || search.all.length === 0) {
        return reply("*No results found on YouTube.* ☹️");
      }

      const results = search.videos.slice(0, 10); 
      let formattedResults = results.map((v, i) => (
        `🎬 *${i + 1}. ${v.title}*\n📅 ${v.ago} | ⌛ ${v.timestamp} | 👁️ ${v.views.toLocaleString()} views\n🔗 ${v.url}`
      )).join("\n\n");

      const caption = `  
Your youtube search results
─────────────────────────
🔎 *Query*: ${q}
${formattedResults}
   `;

      await pavi.sendMessage(
        from,
        {
          image: {
            url: "https://raw.githubusercontent.com/LIYONFFXLK/PAVI-LK/main/images/1754098410527.png",
          },
          caption,
        },
        { quoted: mek }
      );
    } catch (err) {
      console.error(err);
      reply("*An error occurred while searching YouTube.* ❌");
    }
  }
);
