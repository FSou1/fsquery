import parser from "./parser.ts";

import { IDirEntry } from "./types.ts";

import { select } from "./select.ts";

export function fsselect(query: string): Promise<IDirEntry[]> {
  return select(parser.parse(query))
}