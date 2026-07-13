import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { generateReport } from '../utils/generateReport.js';
import { reportResponse } from '../types/apiResponse.js';
import { BASE_URL } from '../utils/Constants.js';

export const data = new SlashCommandBuilder()
  .setName('daily_report')
  .setDescription("Command to generate today's report");

export async function execute(interaction: ChatInputCommandInteraction) {
  const url = BASE_URL + '/report?mode=today';
  const response = await fetch(url, {
    method: 'GET',
  });
  if (!response.ok) {
    console.error('Something went wrong...');
    console.error(await response.json());
    return;
  }
  const data = (await response.json()) as reportResponse;
  if (data.data.length === 0) {
    console.info('No data to crunch.... *sigh*');
    interaction.reply('No data to crunch...');
    return;
  }
  const message = generateReport(data, 'today');
  interaction.reply(message);
}
