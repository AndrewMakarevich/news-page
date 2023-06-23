import { QueryInterface } from 'sequelize';
import { Roles } from 'src/db/models/models';
import { IDefaultModelAttributes } from 'src/db/models/models.interface';
import { IRolesModelCreationAttributes } from 'src/modules/roles/model/roles.model.interface';
import { BASIC_ROLES } from 'src/modules/roles/roles.const';

export default {
  up: async (queryInterface: QueryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const createdAt = new Date().toISOString();

      const rolesToSeed: (IRolesModelCreationAttributes &
        IDefaultModelAttributes)[] = Object.values(BASIC_ROLES).map((role) => ({
        name: role,
        createdAt,
        updatedAt: createdAt,
      }));
      await queryInterface.bulkInsert(Roles.name, rolesToSeed, { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
  down: async (queryInterface: QueryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkDelete(Roles.name, {}, { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
};
