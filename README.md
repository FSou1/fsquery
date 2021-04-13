# fsquery

Find files and folders with SQL-like queries.

The tool is inspired by [fselect](https://github.com/jhspetersson/fselect).

## Usage

TBD

## Functions

`function fsselect(query: string): Promise<IDirEntry[]>` - select directory entries from a folder. The data returned as the array of objects.

## Types

```
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
```

## Example queries

`select * from .`

`select * from root`

`select * from root/sub-a`

## TODO

`select * from root where size > 0`

`select * from root where isDirectory = true`

`select * from root where name = 'root.txt'`

`select * from root where name like '%txt'`

`select * from root where name like '%txt%'`

`select * from root where name like 'txt%'`