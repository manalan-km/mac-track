import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types.js";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env);
const projectUrl = process.env.SUPABASE_PROJECT_URL as string;
const secretKey = process.env.SUPABASE_SECRET_KEY as string;
export const databaseClient = createClient<Database>(projectUrl, secretKey);
