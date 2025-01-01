export function validateInput(input: string): boolean {
    return input.trim().length > 0;
}

export function formatShareLink(platform: string, content: string): string {
    const encodedContent = encodeURIComponent(content);
    switch (platform) {
        case 'telegram':
            return `https://t.me/share/url?url=${encodedContent}`;
        case 'twitter':
            return `https://twitter.com/intent/tweet?text=${encodedContent}`;
        default:
            throw new Error('Unsupported platform');
    }
}