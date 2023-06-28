import { QueryInterface } from 'sequelize';
import {
  psqlCreateTypeForms,
  getCreatePsqlTypeQuery,
} from 'src/db/utils/common/getCreatePsqlTypeQuery/getCreatePsqlTypeQuery';
import { getDropPsqlTypeQuery } from 'src/db/utils/common/getDropPsqlTypeQuery';

export const RULE_OPERATORS_TYPE_NAME = 'rule_operators';

export default {
  up: async (queryInterface: QueryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const createRuleOperatorsTypeQuery = getCreatePsqlTypeQuery({
        name: RULE_OPERATORS_TYPE_NAME,
        asForm: psqlCreateTypeForms.ENUM,
        values: ['eq', 'ne', 'gte', 'gt', 'lt', 'lte', 'regexp', 'iRegexp'],
      });

      await queryInterface.sequelize.query(createRuleOperatorsTypeQuery, {
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
      const dropRuleOperatorsTypeQuery = getDropPsqlTypeQuery({
        name: RULE_OPERATORS_TYPE_NAME,
      });

      await queryInterface.sequelize.query(dropRuleOperatorsTypeQuery, {
        transaction,
      });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
