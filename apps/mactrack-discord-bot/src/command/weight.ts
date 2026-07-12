import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

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

  const response = await fetch('http://127.0.0.1:3000/weight', {
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
