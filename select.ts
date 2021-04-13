import { IDirEntry, IQuery } from "./types.ts";

export async function select(query: IQuery): Promise<IDirEntry[]> {
  const output: IDirEntry[] = [];
  const entries = Deno.readDir(query.from);
  try {
    for await (const entry of entries) {
      const row: IDirEntry = {
        name: entry.name,
        isFile: entry.isFile,
        isDirectory: entry.isDirectory,
        isSymlink: entry.isSymlink,
      };
      const path = `${query.from}/${entry.name}`;
      const info = await Deno.lstat(path);
      row.size = info.size;
      row.accessedAt = info.atime;
      row.createdAt = info.birthtime;
      row.modifiedAt = info.mtime;
      output.push(row);
    }
  } catch (err) {
  }
  return output;
}
