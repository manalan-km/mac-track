import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { BASE_URL } from '../utils/Constants.js';

export const data = new SlashCommandBuilder()
  .setName('macro')
  .setDescription('Command to track macros')
  .addNumberOption((option) =>
    option
      .setName('calories')
      .setDescription('Calories in Kcal')
      .setRequired(true),
  )
  .addNumberOption((option) =>
    option
      .setName('protein')
      .setDescription('Protein in grams')
      .setRequired(true),
  )
  .addStringOption((option) =>
    option.setName('meal_name').setDescription('Meal Name').setRequired(true),
  )
  .addNumberOption((option) =>
    option.setName('fiber').setDescription('Fiber in grams').setRequired(false),
  );
export async function execute(interaction: ChatInputCommandInteraction) {
  const calories = interaction.options.getNumber('calories');
  const protein = interaction.options.getNumber('protein');
  const fiber = interaction.options.getNumber('fiber') ?? 0;
  const mealName = interaction.options.getString('meal_name');

  const body = {
    calories: calories,
    protein: protein,
    fibre: fiber,
    meal_name: mealName,
  };
  const url = BASE_URL + '/macros';
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
    interaction.reply('Logged for the meal dawg!');
  }
}
