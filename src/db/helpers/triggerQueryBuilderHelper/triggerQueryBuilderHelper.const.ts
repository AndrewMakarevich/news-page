export enum psqlTriggerFireMode {
  BEFORE = 'BEFORE',
  AFTER = 'AFTER',
  INSTEAD_OF = 'INSTEAD OF',
}

export enum psqlTriggerEvents {
  INSERT = 'INSERT',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  TRUNCATE = 'TRUNCATE',
}

export enum psqlTriggerForEachMode {
  ROW = 'ROW',
  STATEMENT = 'STATEMENT',
}
