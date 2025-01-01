export default class SocialMediaService {
    generateShareLinks(data: { type: string, content: string }) {
        const links = [];
        if (data.type === 'text') {
            links.push(`https://twitter.com/intent/tweet?text=${encodeURIComponent(data.content)}`);
            links.push(`https://t.me/share/url?url=${encodeURIComponent(data.content)}`);
            links.push(`https://www.instagram.com`); // Ссылка на Instagram
            links.push(`https://www.threads.net`); // Ссылка на Threads
            links.push(`https://www.tiktok.com/tiktokstudio/upload?from=upload`); // Ссылка на TikTok
            links.push(`https://studio.youtube.com/channel/UCMeSLjGQPTrez-MaYKh0qFA`); // Ссылка на YouTube
        }
        return links;
    }
}