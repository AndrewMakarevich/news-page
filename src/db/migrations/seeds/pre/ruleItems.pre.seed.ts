import { QueryInterface } from 'sequelize';
import { TypeQueryBuilderHelper } from 'src/db/helpers/typeQueryBuilderHelper/typeQueryBuilderHelper';
import {
  RULE_ITEM_ARGUMENT_CONTEXTS,
  RULE_ITEM_ARGUMENT_CONTEXTS_TYPE_NAME,
  RULE_ITEM_OPERATORS,
  RULE_ITEM_OPERATORS_TYPE_NAME,
} from '../../../../modules/ruleItems/ruleItems.const';

export default {
  up: async (queryInterface: QueryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const createRuleItemOperatorsTypeQuery =
        TypeQueryBuilderHelper.createEnumType({
          name: RULE_ITEM_OPERATORS_TYPE_NAME,
          values: RULE_ITEM_OPERATORS,
        });
      const createRuleItemContextsTypeQuery =
        TypeQueryBuilderHelper.createEnumType({
          name: RULE_ITEM_ARGUMENT_CONTEXTS_TYPE_NAME,
          values: RULE_ITEM_ARGUMENT_CONTEXTS,
        });

      const rulesTypesBulkQuery = `
      ${createRuleItemOperatorsTypeQuery} 
      ${createRuleItemContextsTypeQuery}`;

      await queryInterface.sequelize.query(rulesTypesBulkQuery, {
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
        types: [
          RULE_ITEM_OPERATORS_TYPE_NAME,
          RULE_ITEM_ARGUMENT_CONTEXTS_TYPE_NAME,
        ],
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
