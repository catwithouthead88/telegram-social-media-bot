import axios from 'axios';

export default class PostController {
    handleTextInput(text: string) {
        // Обработка текстового ввода
        return { type: 'text', content: text };
    }

    handleImageInput(imageUrl: string) {
        // Обработка изображения
        return { type: 'image', content: imageUrl };
    }

    private async getFileUrl(fileId: string): Promise<string> {
        const response = await axios.get(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/getFile?file_id=${fileId}`);
        const filePath = response.data.result.file_path;
        return `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${filePath}`;
    }
}