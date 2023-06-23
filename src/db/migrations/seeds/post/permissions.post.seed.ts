import { QueryInterface } from 'sequelize';
import { Permissions } from 'src/db/models/models';
import { PERMISSIONS } from 'src/modules/permissions/permissions.const';
import { IPermissionsModelCreationAttributes } from 'src/modules/permissions/model/permissions.model.interface';
import { IDefaultModelAttributes } from 'src/db/models/models.interface';

export default {
  up: async (queryInterface: QueryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const createdAt = new Date().toISOString();
      const permissionsToSeed: (IPermissionsModelCreationAttributes &
        IDefaultModelAttributes)[] = Object.values(PERMISSIONS).map(
        (permission) => ({
          name: permission,
          createdAt,
          updatedAt: createdAt,
        }),
      );

      await queryInterface.bulkInsert(Permissions.name, permissionsToSeed, {
        transaction,
      });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
  down: async (queryInterface: QueryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkDelete(Permissions.name, {}, { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
};
