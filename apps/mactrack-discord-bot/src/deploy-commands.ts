import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import { commands } from './command/index.js';
dotenv.config();

const discordToken = process.env.DISCORD_TOKEN;
const commandsData = Object.values(commands).map((command) => command.data);

const rest = new REST({ version: '10' }).setToken(discordToken);

type DeployCommandsProps = {
  guildId: string;
};

async function deployCommands({ guildId }: DeployCommandsProps) {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, guildId),
      {
        body: commandsData,
      },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
}

const guildID = process.env.GUILD_ID;
try {
  await deployCommands({ guildId: guildID });
} catch (error) {
  console.error(error);
}
