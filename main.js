const TelegramBot = require("node-telegram-bot-api");
const { text } = require("stream/consumers");
const token = "5841568173:AAHQtnP6AaIPmvfTnBe7D4IJ8DSejY0Dbwc";
const { lotinga, kirillga } = require("./lotinkirill");
const bot = new TelegramBot(token, { polling: true });

let latinState = 0;
let kirillState = 0;

bot.on("message", (message) => {
  const chatId = message.chat.id;
  const name = message.chat.first_name;
  const username = message.chat.username;

  if (message.text === "/start") {
    bot.sendMessage(
      chatId,
      `Assalawma aleykum <b>${name}</b>. Bottin waziypasin biliw ushin /info nin' ustine basin'`,
      {
        parse_mode: "HTML",
      }
    );
  } else if (message.text === "/info") {
    bot.sendMessage(
      chatId,
      `Bul bot latinnan kirillge kirillden lating'a o'tkerip beredi. Eger tekst latinda bolsa /latin di basin, kerisi bolsa /kirill di basin'`,
      {
        parse_mode: "HTML",
      }
    );
  } else if (message.text === "/latin") {
    bot.sendMessage(chatId, `Latin tilinde text jiberin'`, {
      parse_mode: "HTML",
    });
    latinState = 1;
  } else if (latinState === 1) {
    let latinText = message.text;
    let kirillConvertText = kirillga(latinText);

    bot.sendMessage(chatId, kirillConvertText, {
      parse_mode: "HTML",
    });
  } else if (message.text === "/kirill") {
    bot.sendMessage(chatId, `Kirillshede text jiberin'`, {
      parse_mode: "HTML",
    });
    kirillState = 1;
  } else if (kirillState === 1) {
    let kirillText = message.text;
    let latinConvertText = lotinga(kirillText);

    bot.sendMessage(chatId, latinConvertText, {
      parse_mode: "HTML",
    });
  }
});
