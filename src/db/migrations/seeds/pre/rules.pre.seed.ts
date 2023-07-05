import { QueryInterface } from 'sequelize';
import { TypeQueryBuilderHelper } from 'src/db/helpers/typeQueryBuilderHelper/typeQueryBuilderHelper';
import { psqlCreateTypeForms } from 'src/db/helpers/typeQueryBuilderHelper/typeQueryBuilderHelper.const';

export const RULE_OPERATORS_TYPE_NAME = 'rule_operators';

export default {
  up: async (queryInterface: QueryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const createRuleOperatorsTypeQuery = TypeQueryBuilderHelper.createType({
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
      const dropRuleOperatorsTypeQuery = TypeQueryBuilderHelper.dropType({
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
