import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types/database/database.types";
import dotenv from "dotenv";
dotenv.config();
const projectUrl = process.env.SUPABASE_PROJECT_URL ?? "";
const secretKey = process.env.SUPABASE_SECRET_KEY ?? "";

if (projectUrl === "" || secretKey === "") {
  let message: string = "";
  if (projectUrl === "") {
    message = "Supabase Project URL is not set in .env.";
  }
  if (secretKey === "") {
    message = message + " " + "Supabase Secret Key is not defined in .env.";
  }
  message =
    message +
    " " +
    "Please define it in packages/utils/.env for connecting to the Database.";
  throw new Error(message);
}

export const databaseClient = createClient<Database>(projectUrl, secretKey);
