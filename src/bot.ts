import { Telegraf, Markup, Context } from 'telegraf';
import PostController from './controllers/postController';
import SocialMediaService from './services/socialMediaService';
import * as dotenv from 'dotenv';

dotenv.config(); // Загружает переменные окружения из файла .env

console.log('Environment variables:', process.env); // Добавьте эту строку для отладки

const botToken = process.env.BOT_TOKEN;
if (!botToken) {
    throw new Error('BOT_TOKEN is not defined in the environment variables');
}

const bot = new Telegraf(botToken);
const postController = new PostController();
const socialMediaService = new SocialMediaService();

let dynamicShareLinks: { [key: string]: string } = {};

bot.start((ctx) => ctx.reply('Welcome! Send me some text to share on social media.'));

bot.command('miniapp', (ctx) => {
    ctx.reply('Open the mini-app:', Markup.inlineKeyboard([
        Markup.button.webApp('Open Mini-App', 'https://0d6e-89-110-76-48.ngrok-free.app') // Замените на ваш публичный URL
    ]));
});

bot.on('text', (ctx) => {
    const userInput = ctx.message.text;
    const processedData = postController.handleTextInput(userInput);
    const shareLinks = socialMediaService.generateShareLinks(processedData);

    dynamicShareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(userInput)}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(userInput)}`,
        instagram: 'https://www.instagram.com',
        threads: 'https://www.threads.net',
        tiktok: 'https://www.tiktok.com/tiktokstudio/upload?from=upload',
        youtube: 'https://studio.youtube.com/channel/UCMeSLjGQPTrez-MaYKh0qFA',
        pinterest: `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(userInput)}`
    };

    ctx.reply(
        'Here are your share buttons:',
        Markup.inlineKeyboard([
            [Markup.button.callback('Twitter', 'twitter'), Markup.button.callback('Telegram', 'telegram')],
            [Markup.button.callback('Instagram', 'instagram'), Markup.button.callback('Threads', 'threads')],
            [Markup.button.callback('TikTok', 'tiktok'), Markup.button.callback('YouTube', 'youtube')],
            [Markup.button.callback('Pinterest', 'pinterest')]
        ])
    );
});

bot.action(Object.keys(dynamicShareLinks), async (ctx) => {
    const platform = ctx.match[0] as keyof typeof dynamicShareLinks;
    const link = dynamicShareLinks[platform];
    await ctx.answerCbQuery();
    const message = ctx.update.callback_query?.message;
    if (message && 'reply_markup' in message && message.reply_markup) {
        await ctx.editMessageReplyMarkup({
            inline_keyboard: message.reply_markup.inline_keyboard.map((row: any) =>
                row.map((button: any) => {
                    if (button.callback_data === platform) {
                        return Markup.button.url(`✅ ${button.text}`, link);
                    }
                    return button;
                })
            )
        });
    }
});

bot.launch();
console.log('Bot is running...');