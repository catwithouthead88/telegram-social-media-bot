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
let userInputText: string = '';
let awaitingCorrection: boolean = false;

bot.start((ctx) => ctx.reply('Welcome! Send me some text to share on social media.'));

bot.command('miniapp', (ctx) => {
    ctx.reply('Open the mini-app:', Markup.inlineKeyboard([
        Markup.button.webApp('Open Mini-App', 'https://4be8-89-110-76-48.ngrok-free.app') // Замените на ваш публичный URL
    ]));
});

bot.on('text', (ctx) => {
    if (awaitingCorrection) {
        const correctedText = ctx.message.text;
        awaitingCorrection = false;
        userInputText = correctedText;

        dynamicShareLinks = {
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(userInputText)}`,
            telegram: `https://t.me/share/url?url=${encodeURIComponent(userInputText)}`,
            instagram: 'https://www.instagram.com',
            threads: 'https://www.threads.net',
            tiktok: 'https://www.tiktok.com/tiktokstudio/upload?from=upload',
            youtube: 'https://studio.youtube.com/channel/UCMeSLjGQPTrez-MaYKh0qFA',
            pinterest: `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(userInputText)}`,
            reddit: `https://www.reddit.com/submit?url=${encodeURIComponent(userInputText)}`
        };

        ctx.reply(
            'Here are your share buttons:',
            Markup.inlineKeyboard([
                [Markup.button.url('Twitter', dynamicShareLinks.twitter), Markup.button.url('Telegram', dynamicShareLinks.telegram)],
                [Markup.button.url('Instagram', dynamicShareLinks.instagram), Markup.button.url('Threads', dynamicShareLinks.threads)],
                [Markup.button.url('TikTok', dynamicShareLinks.tiktok), Markup.button.url('YouTube', dynamicShareLinks.youtube)],
                [Markup.button.url('Pinterest', dynamicShareLinks.pinterest), Markup.button.url('Reddit', dynamicShareLinks.reddit)]
            ])
        );
    } else {
        userInputText = ctx.message.text;
        ctx.reply(
            'Do you want to check the spelling and punctuation?',
            Markup.inlineKeyboard([
                Markup.button.callback('Check', 'check_text'),
                Markup.button.callback('Skip', 'skip_check')
            ])
        );
    }
});

bot.action('check_text', (ctx) => {
    const prompt = `Check the spelling and punctuation in the following text: "${userInputText}"`;
    const chatGptUrl = `https://chat.openai.com/?prompt=${encodeURIComponent(prompt)}`;
    awaitingCorrection = true;
    ctx.reply(
        'Please check the spelling and punctuation using ChatGPT:',
        Markup.inlineKeyboard([
            Markup.button.url('Open ChatGPT', chatGptUrl),
            Markup.button.callback('Send corrected text', 'send_corrected_text')
        ])
    );
    ctx.reply('After checking, please send the corrected text back to me.');
});

bot.action('send_corrected_text', (ctx) => {
    ctx.reply('Please send the corrected text.');
});

bot.action('skip_check', (ctx) => {
    dynamicShareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(userInputText)}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(userInputText)}`,
        instagram: 'https://www.instagram.com',
        threads: 'https://www.threads.net',
        tiktok: 'https://www.tiktok.com/tiktokstudio/upload?from=upload',
        youtube: 'https://studio.youtube.com/channel/UCMeSLjGQPTrez-MaYKh0qFA',
        pinterest: `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(userInputText)}`,
        reddit: `https://www.reddit.com/submit?url=${encodeURIComponent(userInputText)}`
    };

    ctx.reply(
        'Here are your share buttons:',
        Markup.inlineKeyboard([
            [Markup.button.url('Twitter', dynamicShareLinks.twitter), Markup.button.url('Telegram', dynamicShareLinks.telegram)],
            [Markup.button.url('Instagram', dynamicShareLinks.instagram), Markup.button.url('Threads', dynamicShareLinks.threads)],
            [Markup.button.url('TikTok', dynamicShareLinks.tiktok), Markup.button.url('YouTube', dynamicShareLinks.youtube)],
            [Markup.button.url('Pinterest', dynamicShareLinks.pinterest), Markup.button.url('Reddit', dynamicShareLinks.reddit)]
        ])
    );
});

bot.launch();
console.log('Bot is running...');
