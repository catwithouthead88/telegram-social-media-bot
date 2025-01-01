# Telegram Social Media Bot

This project is a Telegram bot that simplifies posting to social media by allowing users to input text and images. It generates share buttons for preloaded content in Telegram and Twitter.

## Features

- Input text and images for sharing
- Generate share buttons for Telegram and Twitter
- Easy-to-use interface for posting content

## Project Structure

```
telegram-social-media-bot
├── src
│   ├── bot.ts                  # Entry point for the Telegram bot
│   ├── controllers
│   │   └── postController.ts   # Handles user input for text and images
│   ├── services
│   │   └── socialMediaService.ts # Manages social media sharing functionality
│   ├── utils
│   │   └── index.ts            # Utility functions for input validation and link formatting
│   └── types
│       └── index.ts            # Type definitions for user input and share links
├── package.json                 # npm configuration file
├── tsconfig.json                # TypeScript configuration file
└── README.md                    # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd telegram-social-media-bot
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the bot:
   ```
   npm start
   ```
2. Interact with the bot in Telegram by sending text or images.
3. Use the generated share buttons to post content to Telegram and Twitter.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.