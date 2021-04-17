export interface IQuery {
  type: string;
  fields: string[];
  from: string;
  where: IWhereClause | null;
}

export interface IDirEntry {
  name?: string;
  size?: number;
  createdAt?: Date | null;
  modifiedAt?: Date | null;
  accessedAt?: Date | null;
  isFile?: boolean;
  isDirectory?: boolean;
  isSymlink?: boolean;
}

export interface IWhereClause {
  conditions: IWhereCondition[];
}

export interface IWhereCondition {
  left: string;
  op: 'Different' | 'GreaterThan' | 'LessThan' | 'Equal' | 'Like';
  right: string | number | boolean;
}