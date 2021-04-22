# fsquery

Find files and folders with SQL-like queries.

The tool is inspired by [fselect](https://github.com/jhspetersson/fselect).

[![Deno](https://github.com/FSou1/fsquery/actions/workflows/deno.yml/badge.svg)](https://github.com/FSou1/fsquery/actions/workflows/deno.yml)

## Usage

In order to use the tool, import the function `fsselect` and call it with an sql-like query. That's easy.

```
import { fsselect } from 'https://deno.land/x/fsquery/mod.ts';

const entries = await fsselect("select * from .");

console.log(entries);
```

Output:
```
[
  {
    name: "mod.ts",
    isFile: true,
    isDirectory: false,
    isSymlink: false,
    size: 141,
    accessedAt: 2021-04-14T04:17:46.944Z,
    createdAt: 2021-04-13T21:00:12.353Z,
    modifiedAt: 2021-04-14T04:16:16.692Z
  },
  {
    name: "tests",
    isFile: false,
    isDirectory: true,
    isSymlink: false,
    size: 0,
    accessedAt: 2021-04-14T04:16:17.857Z,
    createdAt: 2021-04-14T04:16:11.120Z,
    modifiedAt: 2021-04-14T04:16:11.120Z
  }
]
```

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

## Queries

### Operators

The list of supported operators: `>`, `<`, `=`, `<>`, `like`.

### Supported 

`select * from .`

`select * from root`

`select * from root/sub-a`

`select * from root where size > 1000000`

`select * from root where isDirectory = true`

`select * from root where isFile <> false`

`select * from root where name = 'root.txt'`

`select * from root where name like '%.txt'`