import { QueryInterface } from 'sequelize';
import { Roles, Permissions, RolesPermissions } from 'src/db/models/models';
import { IDefaultModelAttributes } from 'src/db/models/models.interface';
import { IRolesPermissionsModelCreationAttributes } from 'src/modules/rolesPermissions/model/rolesPermissions.model.interface';
import { BASIC_ROLES_PERMISSIONS } from 'src/modules/rolesPermissions/roles.permissions.const';

export default {
  up: async (queryInterface: QueryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const roles = (await queryInterface.rawSelect(
        Roles.name,
        { plain: false },
        ['id', 'name'],
      )) as unknown as Roles[];

      const permissions = (await queryInterface.rawSelect(
        Permissions.name,
        { plain: false },
        ['id', 'name'],
      )) as unknown as Permissions[];

      const createdAt = new Date().toISOString();

      const seedRolesPermissionsCallbacks = roles.map(async (role) => {
        const permissionsToSeed: Permissions[] = permissions.filter(
          (permission) => BASIC_ROLES_PERMISSIONS[role.name][permission.name],
        );

        const rolesPermissionsToSeed: (IRolesPermissionsModelCreationAttributes &
          IDefaultModelAttributes)[] = permissionsToSeed.map((permission) => ({
          roleId: role.id,
          permissionId: permission.id,
          createdAt,
          updatedAt: createdAt,
        }));

        return queryInterface.bulkInsert(
          RolesPermissions.name,
          rolesPermissionsToSeed,
          { transaction },
        );
      });

      await Promise.all(seedRolesPermissionsCallbacks);

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
  down: async (queryInterface: QueryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkDelete(
        RolesPermissions.name,
        {},
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
};
