import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { env } from 'process';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

import { UsersRepository as UsersRepositoryClass } from 'src/modules/users/repository/users.repository';
import {
  IRegisterParams,
  INotifyAfterRegisterParams,
  IActivateParams,
  ILoginParams,
  IComparePasswordsParams,
  IGetUserActivationLinkParams,
  IPepperisePasswordParams,
} from './auth.service.interface';
import { NodeMailerService as NodeMailerServiceClass } from 'src/modules/nodemailer/service/nodemailer.service';
import { TokensService as TokensServiceClass } from 'src/modules/tokens/service/tokens.service';
import { SessionsService as SessionsServiceClass } from 'src/modules/sessions/service/sessions.service';
import { SessionsRepository as SessionsRepositoryClass } from 'src/modules/sessions/repository/sessions.repository';
import { MAX_USER_PASSWORD_LENGTH } from 'src/modules/users/users.const';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private NodeMailerService: NodeMailerServiceClass,
    private TokensService: TokensServiceClass,
    private SessionsService: SessionsServiceClass,
    private UsersRepository: UsersRepositoryClass,
  ) {}

  async register({ username, email, password, transaction }: IRegisterParams) {
    console.log(bcrypt);
    const hashedPassword = await bcrypt.hash(
      this.pepperisePassword({ password }),
      12,
    );

    const user = await this.UsersRepository.addUser({
      username,
      email,
      password: hashedPassword,
      transaction,
    });

    this.notifyAfterRegister({
      username: user.username,
      email: user.email,
      activationToken: user.activationToken,
    });

    return user;
  }

  async activate({ activationToken, transaction }: IActivateParams) {
    return this.UsersRepository.activateUser({ activationToken, transaction });
  }

  async login({ userIp, username, password, transaction }: ILoginParams) {
    const user = await this.UsersRepository.getOneUser({
      advancedOptions: { where: { username } },
    });

    if (!user) {
      throw new BadRequestException("User with such username doesn't exists");
    }

    if (!user.isActivated) {
      throw new ForbiddenException('User is not activated');
    }

    if (user.isBlocked) {
      throw new ForbiddenException('User is not blocked');
    }

    const passwordsEquals = await this.comparePasswords({
      plainPassword: password,
      hashedPassword: user.password,
    });

    if (!passwordsEquals) {
      throw new BadRequestException('Incorrect password');
    }

    const { accessToken, refreshToken } = this.TokensService.generateTokensPair(
      { user },
    );

    await this.SessionsService.addSession({
      userId: user.id,
      userIp,
      refreshToken,
      transaction,
    });

    return { accessToken, refreshToken };
  }

  private pepperisePassword({ password }: IPepperisePasswordParams) {
    const pepper = env.PASSWORD_PEPPER;
    const pepperedPassword = String(password) + String(pepper);

    if (password.length + pepper.length > MAX_USER_PASSWORD_LENGTH) {
      return pepperedPassword.slice(0, MAX_USER_PASSWORD_LENGTH);
    }

    return pepperedPassword;
  }

  private notifyAfterRegister({
    username,
    email,
    activationToken,
  }: INotifyAfterRegisterParams) {
    const activationLink = this.getUserActivationLink({
      activationToken,
    });

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

  private comparePasswords({
    plainPassword,
    hashedPassword,
  }: IComparePasswordsParams) {
    return bcrypt.compare(
      this.pepperisePassword({ password: plainPassword }),
      hashedPassword,
    );
  }
}
