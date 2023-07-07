import { QueryInterface } from 'sequelize';
import { TypeQueryBuilderHelper } from 'src/db/helpers/typeQueryBuilderHelper/typeQueryBuilderHelper';
export const RULE_ITEM_OPERATORS_TYPE_NAME = 'rule_item_operators';
export const RULE_ITEM_ARGUMENT_CONTEXTS_TYPE_NAME = 'rule_item_contexts';
export const RULE_ITEM_ARGUMENT_SPHERES_TYPE_NAME = 'rule_item_spheres';

// TO REWORK

// type a = {
//   column: string;
// };
//
// type innerA = {
//   name: string;
//   column?: string;
// };
//
// type b = {
//   table: innerA | innerB;
// };
//
// type innerB =
//   | innerA
//   | {
//       name: string;
//       table?: innerB;
//     };
// const test: a | b = {
//   table: {
//     name: 'Collections',
//     table: {
//       name: 'CollectionLikes',
//       column: 'userId',
//     },
//   },
// };
//
// const test1: a | b = {
//   table: {
//     name: 'Collections',
//     column: 'userId',
//   },
// };

export default {
  up: async (queryInterface: QueryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const createRuleItemOperatorsTypeQuery =
        TypeQueryBuilderHelper.createEnumType({
          name: RULE_ITEM_OPERATORS_TYPE_NAME,
          values: ['eq', 'ne', 'gte', 'gt', 'lt', 'lte', 'regexp', 'iRegexp'],
        });
      const createRuleItemContextsTypeQuery =
        TypeQueryBuilderHelper.createEnumType({
          name: RULE_ITEM_ARGUMENT_CONTEXTS_TYPE_NAME,
          values: ['environment', 'subject', 'object', 'constant'],
        });
      const createRuleItemsSpheresTypeQuery =
        TypeQueryBuilderHelper.createEnumType({
          name: RULE_ITEM_ARGUMENT_SPHERES_TYPE_NAME,
          values: ['table', 'column'],
        });

      const rulesTypesBulkQuery = `
      ${createRuleItemOperatorsTypeQuery} 
      ${createRuleItemContextsTypeQuery}
      ${createRuleItemsSpheresTypeQuery}`;

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
          RULE_ITEM_ARGUMENT_SPHERES_TYPE_NAME,
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
