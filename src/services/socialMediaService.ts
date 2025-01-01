export default class SocialMediaService {
    generateShareLinks(data: { type: string, content: string }) {
        const links = [];
        if (data.type === 'text') {
            links.push(`https://twitter.com/intent/tweet?text=${encodeURIComponent(data.content)}`);
            links.push(`https://t.me/share/url?url=${encodeURIComponent(data.content)}`);
        } else if (data.type === 'image') {
            links.push(`https://twitter.com/intent/tweet?url=${encodeURIComponent(data.content)}`);
            links.push(`https://t.me/share/url?url=${encodeURIComponent(data.content)}`);
        }
        return links;
    }
}