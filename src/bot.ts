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

bot.start((ctx) => ctx.reply('Welcome! Send me some text to share on social media.'));

bot.on('text', (ctx) => {
    const userInput = ctx.message.text;
    const processedData = postController.handleTextInput(userInput);
    const shareLinks = socialMediaService.generateShareLinks(processedData);
    ctx.reply(`Here are your share links: ${shareLinks.join(', ')}`);
});

// Удаляем обработку изображений и других медиафайлов

bot.launch();
console.log('Bot is running...');