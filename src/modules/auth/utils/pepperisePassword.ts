import * as dotenv from 'dotenv';
import { env } from 'process';

dotenv.config();

interface IPepperisePasswordParams {
  password: string;
}

export function pepperisePassword({ password }: IPepperisePasswordParams) {
  const pepper = env.PASSWORD_PEPPER;
  const pepperedPassword = String(password) + String(pepper);

  if (password.length + pepper.length > 72) {
    return pepperedPassword.slice(0, 72);
  }

  return pepperedPassword;
}
