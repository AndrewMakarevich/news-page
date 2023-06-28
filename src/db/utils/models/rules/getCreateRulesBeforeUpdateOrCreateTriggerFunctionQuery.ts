import { getCreatePsqlFunctionQuery } from '../../common/getCreatePsqlFunctionQuery/getCreatePsqlFunctionQuery';

export const RULES_BEFORE_UPDATE_OR_CREATE_TRIGGER_FUNCTION_NAME =
  'rules_before_update_or_create_trigger_fc';

export const getCreateRulesBeforeUpdateOrCreateTriggerFunctionQuery = () => {
  return getCreatePsqlFunctionQuery({
    name: RULES_BEFORE_UPDATE_OR_CREATE_TRIGGER_FUNCTION_NAME,
    returnType: 'TRIGGER',
    logic: `
      DECLARE
        is_table_exists boolean := false;
      BEGIN
        IF (TG_OP = 'UPDATE' AND OLD.table IS DISTINCT FROM NEW.table) THEN
          RETURN NEW;
        END IF;

        SELECT
          EXISTS (SELECT table_name
          FROM information_schema.tables
          WHERE table_schema = 'public' AND table_name = NEW.table
          ) INTO is_table_exists;

        IF (is_table_exists) THEN
          RETURN NEW;
        ELSE
          RAISE $raise_body$ Table with such name (%) doesn't exists $raise_body$, NEW.table;
        END IF;
      END
    `,
    language: 'plpgsql',
  });
};
