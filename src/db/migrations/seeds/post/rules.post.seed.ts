import { QueryInterface } from 'sequelize';
import { Rules } from 'src/db/models/models';
import { getDropPsqlFunctionQuery } from 'src/db/utils/common/getDropPsqlFunctionQuery';
import { getDropPsqlTriggerQuery } from 'src/db/utils/common/getDropPsqlTriggerQuery';
import {
  RULES_BEFORE_UPDATE_OR_CREATE_TRIGGER_FUNCTION_NAME,
  getCreateRulesBeforeUpdateOrCreateTriggerFunctionQuery,
} from 'src/db/utils/models/rules/getCreateRulesBeforeUpdateOrCreateTriggerFunctionQuery';
import {
  RULES_BEFORE_UPDATE_OR_CREATE_TRIGGER_NAME,
  getCreateRulesBeforeUpdateOrCreateTriggerQuery,
} from 'src/db/utils/models/rules/getCreateRulesBeforeUpdateOrCreateTriggerQuery';

export default {
  up: async (queryInterface: QueryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const beforeUpdateOrCreateTriggerFunctionQuery =
        getCreateRulesBeforeUpdateOrCreateTriggerFunctionQuery();
      const beforeUpdateOrCreateTriggerQuery =
        getCreateRulesBeforeUpdateOrCreateTriggerQuery();

      console.log(beforeUpdateOrCreateTriggerQuery);

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
      const dropBeforeUpdateOrCreateTriggerQuery = getDropPsqlTriggerQuery({
        name: RULES_BEFORE_UPDATE_OR_CREATE_TRIGGER_NAME,
        tableName: Rules.name,
      });
      const dropBeforeUpdateOrCreateTriggerFunctionQuery =
        getDropPsqlFunctionQuery({
          functions: [
            { name: RULES_BEFORE_UPDATE_OR_CREATE_TRIGGER_FUNCTION_NAME },
          ],
        });

      await queryInterface.sequelize.query(
        dropBeforeUpdateOrCreateTriggerQuery,
        { transaction },
      );
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
