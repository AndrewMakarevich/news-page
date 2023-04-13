import { QueryInterface } from 'sequelize';
import { returnDropPostgresFunctionQuery } from 'src/db/utils/returnDropPostgresFunctionQuery';
import {
  UUIDV6_FUNCTION_NAME,
  returnUUIDV6PsqlFunction,
} from 'src/db/utils/returnUUIDV6PsqlFunction';

export default {
  up: async (queryInterface: QueryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const uuidv6PsqlFunction = returnUUIDV6PsqlFunction();
      await queryInterface.sequelize.query(uuidv6PsqlFunction, { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
  down: async (queryInterface: QueryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const dropUUIDV6FunctionQuery = returnDropPostgresFunctionQuery({
        functions: [{ name: UUIDV6_FUNCTION_NAME }],
      });

      await queryInterface.sequelize.query(dropUUIDV6FunctionQuery, {
        transaction,
      });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
};
