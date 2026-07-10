import { Database } from './database.types.js';

export type reportResponse = {
  data: Database['public']['Tables']['Macros']['Row'][];
  startDate: string;
  endDate: string;
};
