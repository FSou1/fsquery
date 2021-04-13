import parser from "./parser.ts";

import { IDirEntry } from "./types.ts";

import { select } from "./select.ts";

export async function fsselect(query: string): Promise<IDirEntry[]> {
  return await select(parser.parse(query))
}