# 🧮 Discord Calculator Bot

A simple Discord bot with calculator functionality using slash commands. Perform basic arithmetic operations right in your Discord server!

## Features

- ➕ Addition
- ➖ Subtraction
- ✖️ Multiplication
- ➗ Division
- ℹ️ Help command with usage examples

## Prerequisites

- [Node.js](https://nodejs.org/) (v16.9.0 or higher)
- A Discord account
- A Discord server where you have permission to add bots

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/LunaVM/simple-discord-bots
cd simple-discord-bots/simple-calculator
```

### 2. Install Dependencies

**Windows:**
```cmd
npm install
```

**macOS/Linux:**
```bash
npm install
```

### 3. Create Your Discord Bot

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **"New Application"** and give it a name
3. Navigate to the **"Bot"** section in the left sidebar
4. Click **"Add Bot"**
5. Click **"Reset Token"** and copy your bot token (keep this secret!)
6. Go to **"General Information"** and copy your **Application ID** (Client ID)

### 4. Configure the Bot

Open `bot.js` and replace the following values:

```javascript
const TOKEN = 'YOUR_BOT_TOKEN_HERE'; // Paste your bot token
const CLIENT_ID = 'YOUR_CLIENT_ID_HERE'; // Paste your application ID
const WHITELISTED_USERS = [
  '123456789012345678', // Replace with your Discord User ID
];
```

**To find your Discord User ID:**
1. Enable Developer Mode: Discord Settings → Advanced → Developer Mode (toggle on)
2. Right-click your username anywhere in Discord
3. Click **"Copy User ID"**

### 5. Invite the Bot to Your Server

1. In the Developer Portal, go to **"OAuth2"** → **"URL Generator"**
2. Select scopes: `bot` and `applications.commands`
3. Select permissions: `Send Messages` (minimum)
4. Copy the generated URL and open it in your browser
5. Select your server and authorize

## Running the Bot

### Windows

Open Command Prompt or PowerShell in the project directory:

```cmd
node bot.js
```

### macOS/Linux

Open Terminal in the project directory:

```bash
node bot.js
```

### Using PM2 (Recommended for Production)

PM2 is a process manager that keeps your bot running and automatically restarts it if it crashes.

**Install PM2:**
```bash
npm install -g pm2
```

**Start the bot:**
```bash
pm2 start bot.js --name calculator-bot
```

**Other PM2 commands:**
```bash
pm2 status              # Check bot status
pm2 logs calculator-bot # View logs
pm2 restart calculator-bot # Restart bot
pm2 stop calculator-bot    # Stop bot
pm2 startup             # Enable PM2 on system startup
```

## Usage

Once the bot is online, use these slash commands in your Discord server:

- `/add num1:5 num2:3` - Add two numbers
- `/subtract num1:10 num2:4` - Subtract two numbers
- `/multiply num1:7 num2:6` - Multiply two numbers
- `/divide num1:20 num2:5` - Divide two numbers
- `/help` - Display help message with all commands

## Configuration

### Whitelisted Users

The `WHITELISTED_USERS` array in `bot.js` contains Discord User IDs with special permissions. To add more users:

```javascript
const WHITELISTED_USERS = [
  '123456789012345678',
  '987654321098765432',
  '111222333444555666'
];
```

## Troubleshooting

### Commands don't appear in Discord
- Wait a few minutes after starting the bot (Discord can take time to register commands)
- Try restarting Discord
- Make sure the bot has the `applications.commands` scope

### Bot shows as offline
- Verify your bot token is correct
- Check that the bot process is running
- Ensure your internet connection is stable

### "node is not recognized" error (Windows)
- Restart your computer after installing Node.js
- Verify Node.js is in your PATH environment variable

### Permission errors
- Ensure the bot has proper permissions in your server
- Check that you've invited the bot with the correct OAuth2 scopes

## Project Structure

```
simple-calculator/
├── bot.js           # Main bot file
├── package.json     # Project dependencies
├── package-lock.json
└── README.md        # This file
```

## Dependencies

- [discord.js](https://discord.js.org/) - Discord API library for Node.js

## License

MIT License - feel free to use this bot for your own projects!

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Support

If you encounter any issues or have questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Open an issue on GitHub
3. Join the [Discord.js server](https://discord.gg/djs) for general Discord bot help

## Credits

Created with ❤️ using Discord.js

---

**Note:** Never share your bot token publicly! If you accidentally expose it, regenerate it immediately in the Discord Developer Portal.
