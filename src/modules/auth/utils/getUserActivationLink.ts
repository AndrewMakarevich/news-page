import * as dotenv from 'dotenv';
import { env } from 'process';

dotenv.config();

export interface IGetUserActivationLinkParams {
  activationToken: string;
}

export function getUserActivationLink({
  activationToken,
}: IGetUserActivationLinkParams) {
  return `${env.APP_PROTOCOL}://${env.APP_DOMAIN}:${env.APP_LOCAL_PORT}/auth/activate/${activationToken}`;
}
