import { PERMISSIONS } from '../permissions/permissions.const';
import { BASIC_ROLES } from '../roles/roles.const';

const {
  addOwnPost,
  editOwnPost,
  deleteOwnPost,
  addOwnCollection,
  editOwnCollection,
  deleteOwnCollection,
  addOwnComment,
  editOwnComment,
  deleteOwnComment,

  deleteOtherPost,
  deleteOtherCollection,
  deleteOtherComment,

  addOtherCollection,
  editOtherCollection,
  addOtherComment,
  editOtherComment,
  addOtherPost,
  editOtherPost,
} = PERMISSIONS;

const USER_PERMISSIONS = {
  addOwnPost,
  editOwnPost,
  deleteOwnPost,
  addOwnCollection,
  editOwnCollection,
  deleteOwnCollection,
  addOwnComment,
  editOwnComment,
  deleteOwnComment,
};

const MODERATOR_PERMISSIONS = {
  ...USER_PERMISSIONS,
  deleteOtherComment,
  deleteOtherCollection,
  deleteOtherPost,
};

const ADMIN_PERMISSIONS = {
  ...MODERATOR_PERMISSIONS,
  addOtherCollection,
  editOtherCollection,
  addOtherComment,
  editOtherComment,
  addOtherPost,
  editOtherPost,
};

export const BASIC_ROLES_PERMISSIONS = {
  [BASIC_ROLES.user]: USER_PERMISSIONS,
  [BASIC_ROLES.moderator]: MODERATOR_PERMISSIONS,
  [BASIC_ROLES.admin]: ADMIN_PERMISSIONS,
};
