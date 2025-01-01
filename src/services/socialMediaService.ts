export default class SocialMediaService {
    generateShareLinks(text: string, imageUrl?: string): { telegramLink: string; twitterLink: string } {
        const encodedText = encodeURIComponent(text);
        const telegramLink = `https://t.me/share/url?url=${imageUrl ? encodeURIComponent(imageUrl) : ''}&text=${encodedText}`;
        const twitterLink = `https://twitter.com/intent/tweet?text=${encodedText}${imageUrl ? `&url=${encodeURIComponent(imageUrl)}` : ''}`;
        
        return { telegramLink, twitterLink };
    }

    generateTwitterLink(text: string, imageUrl?: string): string {
        const encodedText = encodeURIComponent(text);
        const twitterLink = `https://twitter.com/intent/tweet?text=${encodedText}${imageUrl ? `&url=${encodeURIComponent(imageUrl)}` : ''}`;
        return twitterLink;
    }
}