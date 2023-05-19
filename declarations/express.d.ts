import { Users } from 'src/db/models/models';
import { ITokenPayload } from 'src/modules/tokens/service/tokens.service.interface';

declare global {
  declare namespace Express {
    export interface Request {
      user?: Users;
      accessToken?: string;
      accessTokenPayload?: ITokenPayload;
    }
  }
}
