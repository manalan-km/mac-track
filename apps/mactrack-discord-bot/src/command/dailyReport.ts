import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { generateReport } from '../utils/generateReport.js';
import { reportResponse } from '../types/apiResponse.js';

export const data = new SlashCommandBuilder()
  .setName('daily_report')
  .setDescription("Command to generate today's report");

export async function execute(interaction: ChatInputCommandInteraction) {
  console.log('Requesting daily report');

  const response = await fetch(`http://127.0.0.1:3000/report?mode=today`, {
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
