import {assert } from "./deps.ts"

import { fsselect } from "./mod.ts";

Deno.test("if 'select * from .' works", async () => {
  const result = await fsselect("select * from .");
  assert(result.length === 16);
});

Deno.test("if 'select * from root' works", async () => {
  const result = await fsselect("select * from root");
  assert(result.length === 3);
});

Deno.test("if 'select * from root/test_folder_with_file' works", async () => {
  const result = await fsselect("select * from root/test_folder_with_file");
  assert(result.length === 1);
});
