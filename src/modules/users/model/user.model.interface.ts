import { Comments, Posts, Roles } from 'src/db/models/models';
import { IDefaultModelAttributes } from 'src/db/models/models.interface';
import { Sessions } from 'src/modules/sessions/model/sessions.model';

export interface IUsersModelCreationAttributes {
  username: string;
  email: string;
  password: string;
  roleId: string;
}

export interface IUsersModelAttributes
  extends IDefaultModelAttributes,
    IUsersModelCreationAttributes {
  activationToken: string;
  isBlocked: boolean;
  isActivated: boolean;
  role?: Roles;
  posts?: Posts[];
  comments?: Comments[];
  sessions?: Sessions[];
}
