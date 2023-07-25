import { QueryInterface } from 'sequelize';
import { FunctionQueryBuilderHelper } from 'src/db/helpers/functionQueryBuilderHelper/functionQueryBuilderHelper';
import {
  RULES_BEFORE_UPDATE_OR_CREATE_TRIGGER_FUNCTION_NAME,
  getCreateRulesBeforeUpdateOrCreateTriggerFunctionQuery,
} from 'src/db/utils/models/rules/getCreateRulesBeforeUpdateOrCreateTriggerFunctionQuery';
import { getCreateRulesBeforeUpdateOrCreateTriggerQuery } from 'src/db/utils/models/rules/getCreateRulesBeforeUpdateOrCreateTriggerQuery';

export default {
  up: async (queryInterface: QueryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    // TODO rebase and rework these trigger to ruleItems table
    try {
      const beforeUpdateOrCreateTriggerFunctionQuery =
        getCreateRulesBeforeUpdateOrCreateTriggerFunctionQuery();
      const beforeUpdateOrCreateTriggerQuery =
        getCreateRulesBeforeUpdateOrCreateTriggerQuery();

      await queryInterface.sequelize.query(
        beforeUpdateOrCreateTriggerFunctionQuery,
        { transaction },
      );
      await queryInterface.sequelize.query(beforeUpdateOrCreateTriggerQuery, {
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
      const dropBeforeUpdateOrCreateTriggerFunctionQuery =
        FunctionQueryBuilderHelper.dropFunction({
          functions: [
            { name: RULES_BEFORE_UPDATE_OR_CREATE_TRIGGER_FUNCTION_NAME },
          ],
          cascade: true,
        });

      await queryInterface.sequelize.query(
        dropBeforeUpdateOrCreateTriggerFunctionQuery,
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
};
