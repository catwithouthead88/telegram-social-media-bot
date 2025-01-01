import axios from 'axios';

export default class PostController {
    handleTextInput(text: string) {
        // Обработка текста
        return text;
    }

    async handleImageInput(fileId: string): Promise<string> {
        // Получение URL файла
        const fileUrl = await this.getFileUrl(fileId);
        // Обработка изображения
        return fileUrl;
    }

    private async getFileUrl(fileId: string): Promise<string> {
        const response = await axios.get(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/getFile?file_id=${fileId}`);
        const filePath = response.data.result.file_path;
        return `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${filePath}`;
    }
}