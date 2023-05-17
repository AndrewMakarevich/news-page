import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DestroyOptions, FindOptions, UpdateOptions } from 'sequelize';

import { Sessions } from '../model/sessions.model';
import {
  IAddSessionParams,
  IDeleteSessionsParams,
  IEditSessionParams,
  IGetOneSessionsParams,
  IGetSessionsParams,
} from './sessions.repository.interface';
import { ISessionsModelAttributes } from '../model/sessions.model.interface';

@Injectable()
export class SessionsRepository {
  constructor(@InjectModel(Sessions) private SessionsModel: typeof Sessions) {}

  addSession({
    userId,
    userIp,
    refreshTokenSignature,
    transaction,
  }: IAddSessionParams) {
    return this.SessionsModel.create(
      { userId, ip: userIp, refreshTokenSignature },
      { transaction },
    );
  }

  /**
   @If no advancedOptions provided sessionId required
   @advancedOptions overrides default configuration
   */
  getOneSession({ sessionId, advancedOptions }: IGetOneSessionsParams) {
    let findOptions: FindOptions<ISessionsModelAttributes> = {
      where: { id: sessionId },
    };

    if (advancedOptions) {
      findOptions = advancedOptions;
    }

    return this.SessionsModel.findOne(findOptions);
  }

  /**
   @If no advancedOptions provided userId required
   @advancedOptions overrides default configuration
   */
  getSessions({ userId, advancedOptions }: IGetSessionsParams) {
    let findOptions: FindOptions<ISessionsModelAttributes> = {
      where: { userId: userId },
      order: [['updatedAt', 'ASC']],
    };

    if (advancedOptions) {
      findOptions = advancedOptions;
    }

    return this.SessionsModel.findAll(findOptions);
  }

  /**
   @For session edit without advanced options sessionId & refreshToken are required
   @advancedOptions overrides default configuration
   */
  editSession({
    sessionId,
    refreshTokenSignature,
    advancedOptions,
    transaction,
  }: IEditSessionParams) {
    let updateValues: Partial<ISessionsModelAttributes> = {
      refreshTokenSignature,
    };
    let updateOptions: UpdateOptions<ISessionsModelAttributes> = {
      where: { id: sessionId },
      transaction,
    };

    if (advancedOptions?.values) {
      updateValues = advancedOptions.values;
    }
    if (advancedOptions?.options) {
      updateOptions = { ...advancedOptions.options, transaction };
    }

    return this.SessionsModel.update(updateValues, updateOptions);
  }

  /**
   @If no parameters passed delete will be executed with sessionsIds=[]
   @advancedOptions overrides default configuration
   */
  deleteSessions({
    sessionsIds = [],
    advancedOptions,
    transaction,
  }: IDeleteSessionsParams) {
    const defaultDestroyOptions: DestroyOptions<ISessionsModelAttributes> = {
      where: { id: sessionsIds },
      transaction,
    };
    const destroyOptions = advancedOptions
      ? { ...advancedOptions, transaction }
      : defaultDestroyOptions;

    return this.SessionsModel.destroy(destroyOptions);
  }
}
