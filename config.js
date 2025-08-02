const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "",
ALIVE_IMG: process.env.ALIVE_IMG || "https://github.com/LIYONFFXLK/PAVI-LK/blob/main/images/1754098410527.png",
ALIVE_MSG: process.env.ALIVE_MSG || "*Hello👋 PAVI-MD Is Alive Now😍*",
BOT_OWNER: '94720630290',  // Replace with the owner's phone number



};
