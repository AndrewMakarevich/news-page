import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SessionsRepository as SessionsRepositoryClass } from '../repository/sessions.repository';
import {
  IAddOrRefreshSessionParams,
  IAddSessionParams,
  IDeleteExtraSessionsParams,
  IGetUserCanHaveSession,
  IRefreshSessionParams,
} from './sessions.service.interface';
import { TokensService as TokensServiceClass } from 'src/modules/tokens/service/tokens.service';
import { MAX_SESSIONS_AMOUNT } from '../sessions.const';
import { UsersRepository as UsersRepositoryClass } from 'src/modules/users/repository/users.repository';
import { UsersService as UsersServiceClass } from 'src/modules/users/service/users.service';

@Injectable()
export class SessionsService {
  constructor(
    private TokensService: TokensServiceClass,
    private UsersService: UsersServiceClass,
    private UsersRepository: UsersRepositoryClass,
    private SessionsRepository: SessionsRepositoryClass,
  ) {}

  async addOrRefreshSession({
    userId,
    userIp,
    currentRefreshToken,
    transaction,
  }: IAddOrRefreshSessionParams) {
    let { accessToken, refreshToken } =
      (await this.refreshSession({
        userId,
        userIp,
        currentRefreshToken,
        transaction,
      })) || {};

    if (!accessToken || !refreshToken) {
      ({ accessToken, refreshToken } = await this.addSession({
        userId,
        userIp,
        transaction,
      }));
    }

    return { accessToken, refreshToken };
  }

  async addSession({ userId, userIp, transaction }: IAddSessionParams) {
    const user = await this.checkUserCanHaveSession({
      userId,
      sessionInteractionType: 'create',
    });

    await this.deleteExtraSessions({ userId, reserve: 1, transaction });

    const { accessToken, refreshToken } = this.TokensService.generateTokensPair(
      { user },
    );
    const refreshTokenSignature = this.TokensService.getTokenSignature({
      token: refreshToken,
    });
    const hashedUserIp = userIp ? await bcrypt.hash(userIp, 12) : userIp;

    await this.SessionsRepository.addSession({
      userId,
      userIp: hashedUserIp,
      refreshTokenSignature,
      transaction,
    });

    return { accessToken, refreshToken };
  }

  async refreshSession({
    userId,
    userIp,
    currentRefreshToken,
    transaction,
  }: IRefreshSessionParams) {
    const user = await this.checkUserCanHaveSession({
      userId,
      sessionInteractionType: 'refresh',
    });

    const currentRefreshTokenSignature = this.TokensService.getTokenSignature({
      token: currentRefreshToken,
    });
    const session = await this.SessionsRepository.getOneSession({
      advancedOptions: {
        where: { refreshTokenSignature: currentRefreshTokenSignature },
      },
    });

    if (!session) {
      return null;
    }

    const ipsEquals = userIp
      ? await bcrypt.compare(userIp, session.ip)
      : userIp;
    const usersIdsEquals = userId === session.userId;

    if (!ipsEquals || usersIdsEquals) {
      await this.SessionsRepository.deleteSessions({
        sessionsIds: [session.id],
        transaction,
      });

      throw new BadRequestException(
        "Refresh token doesn't belongs to you. Corresponding session deleted",
      );
    }

    const { accessToken, refreshToken } = this.TokensService.generateTokensPair(
      { user },
    );
    const newRefreshTokenSignature = this.TokensService.getTokenSignature({
      token: currentRefreshToken,
    });

    await this.SessionsRepository.editSession({
      sessionId: session.id,
      refreshTokenSignature: newRefreshTokenSignature,
      transaction,
    });

    return { accessToken, refreshToken };
  }

  async deleteExtraSessions({
    userId,
    reserve = 0,
    transaction,
  }: IDeleteExtraSessionsParams) {
    const activeSessions = await this.SessionsRepository.getSessions({
      userId,
    });

    if (!activeSessions || activeSessions.length === 0) {
      return;
    }

    if (activeSessions.length >= MAX_SESSIONS_AMOUNT) {
      const sessionsAmountToDelete = Math.abs(
        MAX_SESSIONS_AMOUNT - activeSessions.length - reserve,
      );

      const sessionsIdsToDelete: string[] = [];

      for (let i = 0; i < sessionsAmountToDelete; i++) {
        sessionsIdsToDelete.push(activeSessions[i].id);
      }

      return this.SessionsRepository.deleteSessions({
        sessionsIds: sessionsIdsToDelete,
        transaction,
      });
    }
  }

  async checkUserCanHaveSession({
    userId,
    sessionInteractionType,
  }: IGetUserCanHaveSession) {
    const user = await this.UsersRepository.getOneUser({ userId });

    const healthCheckedUser = this.UsersService.checkUserHealth({
      user,
      errorMessages: {
        userIsNull: `You tried to ${sessionInteractionType} session for an unregistered user.`,
        userIsNotActivated: `You can't ${sessionInteractionType} session as user isn't activated yet.`,
        userIsBlocked: `You can't ${sessionInteractionType} session as user is blocked.`,
      },
    });

    return healthCheckedUser;
  }
}
