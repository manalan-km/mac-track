import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { BASE_URL } from '../utils/Constants.js';

export const data = new SlashCommandBuilder()
  .setName('weight')
  .setDescription('Command to track weight')
  .addNumberOption((option) =>
    option
      .setName('weight')
      .setDescription('Weight in kilograms')
      .setRequired(true),
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const weight = interaction.options.getNumber('weight');
  const body = {
    weight: weight,
  };
  const url = BASE_URL + '/weight';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.error('Something went wrong *sigh*: ', await response.json());
    interaction.reply('Something went wrong maapi....*sigh*');
  } else {
    console.log('Mudichachu');
    interaction.reply('Weight loggged dawg!');
  }
}
