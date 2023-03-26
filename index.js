const { Telegraf } = require("telegraf");

const bot = new Telegraf("6101624837:AAGr8l3LqspLWq-r8f4hGz0x92M9O4cQNsg");

bot.command("start", (ctx) => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    `hello ${ctx.chat.id}! Welcome to my new telegram bot.`
  );
});

bot.hears("animals", (ctx) => {
  console.log(ctx.from);
  let animalMessage = `great, here are pictures of animals you would love`;
  ctx.deleteMessage();
  bot.telegram.sendMessage(ctx.chat.id, animalMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "dog",
            callback_data: "dog",
          },
          {
            text: "cat",
            callback_data: "cat",
          },
        ],
      ],
    },
  });
});

bot.action("dog", (ctx) => {
  bot.telegram.sendPhoto(ctx.chat.id, {
    source: "res/dog.jpeg",
  });
});

bot.action("cat", (ctx) => {
  bot.telegram.sendPhoto(ctx.chat.id, {
    source: "res/catshark.webp",
  });
});

const requestPhoneKeyboard = {
  reply_markup: {
    one_time_keyboard: true,
    keyboard: [
      [
        {
          text: "My phone number",
          request_contact: true,
          one_time_keyboard: true,
        },
      ],
      ["Cancel"],
    ],
  },
};

const requestLocationKeyboard = {
  reply_markup: {
    one_time_keyboard: true,
    keyboard: [
      [
        {
          text: "My location",
          request_location: true,
          one_time_keyboard: true,
        },
      ],
      ["Cancel"],
    ],
  },
};

bot.hears("phone", (ctx, next) => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    "Can we get access to your phone number?",
    requestPhoneKeyboard
  );
});

bot.hears("location", (ctx, next) => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    "Can we get access to your location?",
    requestLocationKeyboard
  );
});

bot.launch();
