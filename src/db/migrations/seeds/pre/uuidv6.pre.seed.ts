import { QueryInterface } from 'sequelize';
import { FunctionQueryBuilderHelper } from 'src/db/helpers/functionQueryBuilderHelper/functionQueryBuilderHelper';
import {
  UUIDV6_FUNCTION_NAME,
  getCreateUUIDV6PsqlFunctionQuery,
} from 'src/db/utils/common/getCreateUUIDV6PsqlFunctionQuery';

export default {
  up: async (queryInterface: QueryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const uuidv6PsqlFunction = getCreateUUIDV6PsqlFunctionQuery();
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
      const dropUUIDV6FunctionQuery = FunctionQueryBuilderHelper.dropFunction({
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
