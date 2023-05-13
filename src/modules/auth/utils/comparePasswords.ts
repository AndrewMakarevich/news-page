import bcrypt from 'bcrypt';
import { pepperisePassword } from './pepperisePassword';

interface IComparePasswordsParams {
  plainPassword: string;
  hashedPassword: string;
}

export function comparePasswords({
  plainPassword,
  hashedPassword,
}: IComparePasswordsParams) {
  return bcrypt.compare(
    pepperisePassword({ password: plainPassword }),
    hashedPassword,
  );
}
