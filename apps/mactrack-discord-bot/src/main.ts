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
  console.log('IsCommand():', interaction.isCommand());
  if (!interaction.isCommand()) {
    return;
  }

  console.log('Commands: ', commands);

  const { commandName } = interaction;
  console.log('Command Name: ', commandName);
  console.log(
    'commandName as keyof typeof commands:',
    commandName as keyof typeof commands,
  );
  // console.log(
  //   'commands[commandName as keyof typeof commands]:',
  //   commands[commandName as keyof typeof commands],
  // );
  if (commands[commandName as keyof typeof commands]) {
    commands[commandName as keyof typeof commands].execute(
      interaction as ChatInputCommandInteraction,
    );
  }
});
console.log('Hello World');
client.login(discordToken);
