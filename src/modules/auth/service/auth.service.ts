import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import * as dotenv from 'dotenv';
import { env } from 'process';
import { UsersRepository as UsersRepositoryClass } from 'src/modules/users/repository/users.repository';
import {
  IRegisterParams,
  INotifyAfterRegisterParams,
  IGetUserActivationLinkParams,
} from './auth.service.interface';
import { NodeMailerService as NodeMailerServiceClass } from 'src/modules/nodemailer/service/nodemailer.service';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private UsersRepository: UsersRepositoryClass,
    private NodeMailerService: NodeMailerServiceClass,
  ) {}

  async register({ username, email, password, transaction }: IRegisterParams) {
    const hashedPassword = await hash(password, 12);

    const user = await this.UsersRepository.addUser({
      username,
      email,
      password: hashedPassword,
      transaction,
    });
    const notificationResult = await this.notifyAfterRegister({
      username: user.username,
      email: user.email,
      activationToken: user.activationToken,
    });

    console.log(notificationResult);

    return user;
  }

  private async notifyAfterRegister({
    username,
    email,
    activationToken,
  }: INotifyAfterRegisterParams) {
    const activationLink = this.getUserActivationLink({ activationToken });

    return this.NodeMailerService.sendMail({
      to: email,
      subject: 'Account activation',
      text: `${username}, your account successfully created`,
      html: `
        <div>
          To activate your account, follow next link:
          <a href="${activationLink}">${activationLink}</a>
        </div>
      `,
    });
  }

  private getUserActivationLink({
    activationToken,
  }: IGetUserActivationLinkParams) {
    return `${env.APP_PROTOCOL}://${env.APP_DOMAIN}:${env.APP_LOCAL_PORT}/auth/activate/${activationToken}`;
  }
}
