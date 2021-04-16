import {assert } from "./deps.ts"

import { fsselect } from "./mod.ts";

Deno.test("if 'select * from .' works", async () => {
  const result = await fsselect("select * from .");
  assert(result.length === 18);
});

Deno.test("if 'select * from root' works", async () => {
  const result = await fsselect("select * from root");
  assert(result.length === 3);
});

Deno.test("if 'select * from root/test_folder_with_file' works", async () => {
  const result = await fsselect("select * from root/test_folder_with_file");
  assert(result.length === 2);
});

Deno.test("if 'select * from root/test_folder_with_file where size > 1000000' works", async () => {
  const result = await fsselect("select * from root/test_folder_with_file where size > 1000000");
  assert(result.length === 1);
  assert(result[0].name === 'b-file-1MB.txt');
});