export interface IQuery {
  type: string;
  fields: string[];
  from: string;
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
