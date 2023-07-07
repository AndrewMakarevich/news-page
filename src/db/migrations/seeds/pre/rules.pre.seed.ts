import { QueryInterface } from 'sequelize';
import { TypeQueryBuilderHelper } from 'src/db/helpers/typeQueryBuilderHelper/typeQueryBuilderHelper';

export const RULE_ACTIONS_TYPE_NAME = 'rule_actions';
export const RULE_OPERATORS_TYPE_NAME = 'rule_operators';
export const RULE_EFFECTS_TYPE_NAME = 'rule_effects';

export default {
  up: async (queryInterface: QueryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const createRuleActionsTypeQuery = TypeQueryBuilderHelper.createEnumType({
        name: RULE_ACTIONS_TYPE_NAME,
        values: ['insert', 'select', 'update', 'delete'],
      });

      const createRuleEffectsTypeQuery = TypeQueryBuilderHelper.createEnumType({
        name: RULE_EFFECTS_TYPE_NAME,
        values: ['permit', 'deny'],
      });

      const rulesTypesBulkQuery = `
      ${createRuleActionsTypeQuery} 
      ${createRuleEffectsTypeQuery}`;

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
        types: [RULE_ACTIONS_TYPE_NAME, RULE_EFFECTS_TYPE_NAME],
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
