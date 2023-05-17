import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SessionsRepository as SessionsRepositoryClass } from '../repository/sessions.repository';
import {
  IAddSession,
  IDeleteExtraSessions,
  IEditSessionParams,
  IUpdateOrAddSession,
} from './sessions.service.interface';
import { TokensService as TokensServiceClass } from 'src/modules/tokens/service/tokens.service';
import { MAX_SESSIONS_AMOUNT } from '../sessions.const';

@Injectable()
export class SessionsService {
  constructor(
    private TokensService: TokensServiceClass,
    private SessionsRepository: SessionsRepositoryClass,
  ) {}

  async addSession({ userId, userIp, refreshToken, transaction }: IAddSession) {
    await this.deleteExtraSessions({ userId, reserve: 1, transaction });

    const refreshTokenSignature = this.TokensService.getTokenSignature({
      token: refreshToken,
    });
    const hashedUserIp = await bcrypt.hash(userIp, 12);

    return this.SessionsRepository.addSession({
      userId,
      userIp: hashedUserIp,
      refreshTokenSignature,
      transaction,
    });
  }

  async refreshSession({
    userId,
    userIp,
    refreshToken,
    transaction,
  }: IUpdateOrAddSession) {
    const refreshTokenSignature = this.TokensService.getTokenSignature({
      token: refreshToken,
    });

    const session = await this.SessionsRepository.getOneSession({
      advancedOptions: {
        where: { refreshTokenSignature },
      },
    });

    const ipsEquals = await bcrypt.compare(userIp, session.ip);
    const usersIdsEquals = userId === session.userId;

    if (!ipsEquals && usersIdsEquals) {
      await this.SessionsRepository.deleteSessions({
        sessionsIds: [session.id],
        transaction,
      });

      throw new BadRequestException(
        "Refresh token doesn't belongs to you. Corresponding session deleted",
      );
    }

    return await this.SessionsRepository.editSession({
      sessionId: session.id,
      refreshTokenSignature,
      transaction,
    });
  }

  async editSession({
    sessionId,
    refreshToken,
    transaction,
  }: IEditSessionParams) {
    const refreshTokenSignature = this.TokensService.getTokenSignature({
      token: refreshToken,
    });

    return this.SessionsRepository.editSession({
      sessionId,
      refreshTokenSignature,
      transaction,
    });
  }

  async deleteExtraSessions({
    userId,
    reserve = 0,
    transaction,
  }: IDeleteExtraSessions) {
    const activeSessions = await this.SessionsRepository.getSessions({
      userId,
    });

    if (activeSessions.length >= MAX_SESSIONS_AMOUNT) {
      const sessionsAmountToDelete =
        MAX_SESSIONS_AMOUNT - activeSessions.length + reserve;

      const sessionsIdsToDelete: string[] = [];

      for (let i = 0; i < sessionsAmountToDelete; i++) {
        sessionsIdsToDelete.push(activeSessions[i].id);
      }

      await this.SessionsRepository.deleteSessions({
        sessionsIds: sessionsIdsToDelete,
        transaction,
      });
    }
  }
}
