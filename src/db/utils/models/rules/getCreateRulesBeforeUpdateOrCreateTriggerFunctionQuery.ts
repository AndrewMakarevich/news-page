import { FunctionQueryBuilderHelper } from 'src/db/helpers/functionQueryBuilderHelper/functionQueryBuilderHelper';

export const RULES_BEFORE_UPDATE_OR_CREATE_TRIGGER_FUNCTION_NAME =
  'rules_before_update_or_create_trigger_fc';

export const getCreateRulesBeforeUpdateOrCreateTriggerFunctionQuery = () => {
  return FunctionQueryBuilderHelper.createFunction({
    name: RULES_BEFORE_UPDATE_OR_CREATE_TRIGGER_FUNCTION_NAME,
    returnType: 'TRIGGER',
    logic: `
      DECLARE
        is_table_exists boolean := true;
        is_column_exists boolean := true;
      BEGIN
        IF (TG_OP = 'UPDATE' AND (OLD.table IS DISTINCT FROM NEW.table AND OLD.column IS DISTINCT FROM NEW.column)) THEN
          RETURN NEW;
        END IF;

        IF (OLD.table IS DISTINCT FROM NEW.table) THEN
          SELECT
            EXISTS (SELECT table_name FROM information_schema.tables
            WHERE table_schema = 'public' AND table_name = NEW.table)
            INTO is_table_exists;
        END IF;

        IF (OLD.column IS DISTINCT FROM NEW.column) THEN
          SELECT
            EXISTS (SELECT column_name FROM information_schema.columns
            WHERE table_schema = 'public' AND table_name = NEW.table AND column_name = NEW.column)
            INTO is_column_exists;
        END iF;

        IF (is_table_exists AND is_column_exists) THEN
          RETURN NEW;
        ELSEIF (is_table_exists IS NOT TRUE) THEN
          RAISE $raise_body$ Table with such name (%) doesn't exists $raise_body$, NEW.table;
        ELSEIF (is_column_exists IS NOT TRUE) THEN
          RAISE $raise_body$ Table (%) column with such name (%) doesn't exists $raise_body$, NEW.table, NEW.column;
        END IF;
      END
    `,
    language: 'plpgsql',
  });
};
