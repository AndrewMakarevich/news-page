import { Users } from '../model/users.model';

export interface IGetOneUserParams {
  userId: string;
}

export interface ICheckUserHealthParams {
  user: Users | null;
  errorMessages?: {
    userIsNull?: string;
    userIsNotActivated?: string;
    userIsBlocked?: string;
  };
}
