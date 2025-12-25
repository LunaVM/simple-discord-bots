const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

// Configuration
const TOKEN = 'YOUR_BOT_TOKEN_HERE';
const CLIENT_ID = 'YOUR_CLIENT_ID_HERE';
const WHITELISTED_USERS = [
  '123456789012345678', // Replace with actual user IDs
  '987654321098765432'
];

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Define slash commands
const commands = [
  new SlashCommandBuilder()
    .setName('add')
    .setDescription('Add two numbers')
    .addNumberOption(option =>
      option.setName('num1')
        .setDescription('First number')
        .setRequired(true))
    .addNumberOption(option =>
      option.setName('num2')
        .setDescription('Second number')
        .setRequired(true)),

  new SlashCommandBuilder()
    .setName('subtract')
    .setDescription('Subtract two numbers')
    .addNumberOption(option =>
      option.setName('num1')
        .setDescription('First number')
        .setRequired(true))
    .addNumberOption(option =>
      option.setName('num2')
        .setDescription('Second number')
        .setRequired(true)),

  new SlashCommandBuilder()
    .setName('multiply')
    .setDescription('Multiply two numbers')
    .addNumberOption(option =>
      option.setName('num1')
        .setDescription('First number')
        .setRequired(true))
    .addNumberOption(option =>
      option.setName('num2')
        .setDescription('Second number')
        .setRequired(true)),

  new SlashCommandBuilder()
    .setName('divide')
    .setDescription('Divide two numbers')
    .addNumberOption(option =>
      option.setName('num1')
        .setDescription('Numerator')
        .setRequired(true))
    .addNumberOption(option =>
      option.setName('num2')
        .setDescription('Denominator')
        .setRequired(true)),

  new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show calculator commands and usage')
].map(command => command.toJSON());

// Register slash commands
const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');
    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands }
    );
    console.log('Slash commands registered successfully!');
  } catch (error) {
    console.error('Error registering commands:', error);
  }
})();

client.once('ready', () => {
  console.log(`Bot is online as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName, user } = interaction;
  const num1 = interaction.options.getNumber('num1');
  const num2 = interaction.options.getNumber('num2');

  let result;

  try {
    switch (commandName) {
      case 'add':
        result = num1 + num2;
        await interaction.reply(`${num1} + ${num2} = **${result}**`);
        break;

      case 'subtract':
        result = num1 - num2;
        await interaction.reply(`${num1} - ${num2} = **${result}**`);
        break;

      case 'multiply':
        result = num1 * num2;
        await interaction.reply(`${num1} × ${num2} = **${result}**`);
        break;

      case 'divide':
        // Secret behavior: division by zero
        if (num2 === 0) {
          if (WHITELISTED_USERS.includes(user.id)) {
            await interaction.reply('🔄 Restarting bot... (whitelisted user detected)');
            console.log(`Bot restart triggered by whitelisted user: ${user.tag} (${user.id})`);
            process.exit(0); // Exit the process (restart if using a process manager)
          } else {
            // For normal users, react with X emoji
            await interaction.reply('Cannot divide by zero. ❌');
            return;
          }
        }
        
        result = num1 / num2;
        await interaction.reply(`${num1} ÷ ${num2} = **${result}**`);
        break;

      case 'help':
        const helpEmbed = {
          color: 0x5865F2,
          title: '🧮 Calculator Bot',
          description: 'A simple calculator bot with basic arithmetic operations.',
          fields: [
            {
              name: '➕ /add',
              value: 'Add two numbers together\nExample: `/add num1:5 num2:3` → **8**'
            },
            {
              name: '➖ /subtract',
              value: 'Subtract the second number from the first\nExample: `/subtract num1:10 num2:4` → **6**'
            },
            {
              name: '✖️ /multiply',
              value: 'Multiply two numbers\nExample: `/multiply num1:7 num2:6` → **42**'
            },
            {
              name: '➗ /divide',
              value: 'Divide the first number by the second\nExample: `/divide num1:20 num2:5` → **4**'
            },
            {
              name: 'ℹ️ /help',
              value: 'Show this help message'
            }
          ],
          footer: {
            text: 'Use the commands above to perform calculations!'
          }
        };
        
        await interaction.reply({ embeds: [helpEmbed] });
        break;
    }
  } catch (error) {
    console.error('Error handling command:', error);
    await interaction.reply('An error occurred while processing your command.');
  }
});

client.login(TOKEN);
