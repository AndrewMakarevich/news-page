import { Users } from 'src/db/models/models';

declare global {
  declare namespace Express {
    export interface Request {
      user?: Users;
    }
  }
}
