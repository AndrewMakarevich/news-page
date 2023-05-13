import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import * as dotenv from 'dotenv';
import { UsersRepository as UsersRepositoryClass } from 'src/modules/users/repository/users.repository';
import {
  IRegisterParams,
  INotifyAfterRegisterParams,
  IActivateParams,
  ILoginParams,
} from './auth.service.interface';
import { NodeMailerService as NodeMailerServiceClass } from 'src/modules/nodemailer/service/nodemailer.service';
import { pepperisePassword } from '../utils/pepperisePassword';
import { comparePasswords } from '../utils/comparePasswords';
import { TokensService as TokensServiceClass } from 'src/modules/tokens/service/tokens.service';
import { getUserActivationLink } from '../utils/getUserActivationLink';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private NodeMailerService: NodeMailerServiceClass,
    private TokensService: TokensServiceClass,
    private UsersRepository: UsersRepositoryClass,
  ) {}

  async register({ username, email, password, transaction }: IRegisterParams) {
    const hashedPassword = await hash(pepperisePassword({ password }), 12);

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

  async activate({ activationToken }: IActivateParams) {
    return this.UsersRepository.activateUser({ activationToken });
  }

  async login({ username, password }: ILoginParams) {
    const user = await this.UsersRepository.getOneUser({
      advancedOptions: { where: { username } },
    });

    if (!user) {
      throw new BadRequestException("User with such username doesn't exists");
    }

    const passwordsEquals = comparePasswords({
      plainPassword: password,
      hashedPassword: user.password,
    });

    if (!passwordsEquals) {
      throw new BadRequestException('Incorrect password');
    }

    const { accessToken, refreshToken } = this.TokensService.generateTokensPair(
      { user },
    );

    return { accessToken, refreshToken };
  }

  private async notifyAfterRegister({
    username,
    email,
    activationToken,
  }: INotifyAfterRegisterParams) {
    const activationLink = getUserActivationLink({ activationToken });

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
}
