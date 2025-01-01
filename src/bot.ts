import { Telegraf } from 'telegraf';
import PostController from './controllers/postController';
import SocialMediaService from './services/socialMediaService'; // Corrected import statement
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

bot.start((ctx) => ctx.reply('Welcome! Send me some text or an image to share on social media.'));

bot.on('text', (ctx) => {
    const userInput = ctx.message.text;
    const processedData = postController.handleTextInput(userInput);
    const shareLinks = socialMediaService.generateShareLinks(processedData);
    ctx.reply('Share your post:', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Share on Telegram', url: shareLinks.telegramLink }],
                [{ text: 'Share on Twitter', url: shareLinks.twitterLink }],
            ],
        },
    });
});

bot.on('photo', async (ctx) => {
    const fileId = ctx.message.photo[ctx.message.photo.length - 1].file_id;
    const processedData = await postController.handleImageInput(fileId);
    const shareLinks = socialMediaService.generateShareLinks('', processedData);
    ctx.reply('Share your post:', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Share on Telegram', url: shareLinks.telegramLink }],
                [{ text: 'Share on Twitter', url: shareLinks.twitterLink }],
            ],
        },
    });
});

bot.launch();
console.log('Bot is running...');