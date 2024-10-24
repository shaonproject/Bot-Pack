const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: "tiktok",
  version: "1.0.",
  hasPermssion: 0,
  credits: "Shaon Ahmed",
  usePrefix: true,
  description: "TikTok Video Downloader",
  commandCategory: "video downloader",
  usages: "[tiktok video link]",
  cooldowns: 2
};

module.exports.handleEvent = async function ({ api, event }) {
  const tiktokPatterns = [
    /https:\/\/vm\.tiktok\.com\/[A-Za-z0-9]+/,
    /https:\/\/m\.tiktok\.com\/[A-Za-z0-9]+/,
    /https:\/\/vt\.tiktok\.com\/[A-Za-z0-9]+/,
    /https:\/\/(www\.)?tiktok\.com\/(@[A-Za-z0-9_.]+\/video\/[0-9]+|v\/[0-9A-Za-z]+)/
  ];

  const messageBody = event.body;
  if (!messageBody) return;

  let link = null;
  for (const pattern of tiktokPatterns) {
    const match = messageBody.match(pattern);
    if (match) {
      link = match[0];
      break;
    }
  }

  if (!link) return;

  api.sendMessage("Downloading video, please wait...!!", event.threadID, event.messageID);
const apis = await axios.get('https://raw.githubusercontent.com/shaonproject/Shaon/main/api.json')
  const Shaon = apis.data.api
  try {
    const tempPath = path.join(__dirname, 'cache', 'tik_dip.mp4');
    const response = await axios.get(`${Shaon}/tiktok/downloadvideo?url=${encodeURIComponent(link)}`);
    const data = response.data.data;

    const videoResponse = await axios.get(data.play, { responseType: "arraybuffer" });
    fs.writeFileSync(tempPath, Buffer.from(videoResponse.data));

    api.sendMessage({
      body: `⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆\n\n🔰Downloaded Tiktok Video✅\n\n⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆`,
      attachment: fs.createReadStream(tempPath)
    }, event.threadID, () => fs.unlinkSync(tempPath), event.messageID);

  } catch (error) {
    console.error(error);
    api.sendMessage(`Error: ${error.message}`, event.threadID, event.messageID);
  }
};

module.exports.run = function () {};
