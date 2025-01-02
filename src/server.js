const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/social-media-bot', { useNewUrlParser: true, useUnifiedTopology: true });

const cookieSchema = new mongoose.Schema({
    userId: String,
    cookies: String
});

const Cookie = mongoose.model('Cookie', cookieSchema);

app.post('/save-cookies', async (req, res) => {
    const { cookies } = req.body;
    const userId = 'some-user-id'; // Замените на реальный userId

    try {
        await Cookie.findOneAndUpdate({ userId }, { cookies }, { upsert: true });
        res.status(200).send('Cookies saved successfully');
    } catch (error) {
        res.status(500).send('Failed to save cookies');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});