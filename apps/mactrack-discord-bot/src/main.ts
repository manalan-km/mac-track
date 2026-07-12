import {
  ChatInputCommandInteraction,
  Client,
  Events,
  GatewayIntentBits,
} from 'discord.js';
import dotenv from 'dotenv';
import { commands } from './command/index.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
dotenv.config();

const discordToken = process.env.DISCORD_TOKEN;
client.once(Events.ClientReady, (client) => {
  console.log('Logged in as', client.user.tag);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }


  const { commandName } = interaction;

  if (commands[commandName as keyof typeof commands]) {
    commands[commandName as keyof typeof commands].execute(
      interaction as ChatInputCommandInteraction,
    );
  }
});
client.login(discordToken);
