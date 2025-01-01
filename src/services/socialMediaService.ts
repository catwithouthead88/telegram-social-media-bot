export default class SocialMediaService {
    generateShareLinks(data: { type: string, content: string }) {
        const links = [];
        if (data.type === 'text') {
            links.push(`https://twitter.com/intent/tweet?text=${encodeURIComponent(data.content)}`);
            links.push(`https://t.me/share/url?url=${encodeURIComponent(data.content)}`);
            links.push(`https://www.instagram.com`); // Ссылка на Instagram
            links.push(`https://www.threads.net`); // Ссылка на Threads
        }
        return links;
    }
}