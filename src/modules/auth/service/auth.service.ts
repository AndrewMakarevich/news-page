import { Injectable } from '@nestjs/common';
import { UsersRepository as UsersRepositoryClass } from 'src/modules/users/repository/users.repository';
import {
  IRegisterParams,
  INotifyAfterRegisterParams,
  IGetUserActivationLinkParams,
} from './auth.service.interface';
import { hash } from 'bcrypt';
import { NodeMailerService as NodeMailerServiceClass } from 'src/modules/nodemailer/service/nodemailer.service';
import { URL } from 'url';

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
    return `http://localhost:3000/auth/activate/${activationToken}`;
  }
}
