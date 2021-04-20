import { assert, assertArrayIncludes, assertEquals } from "./deps.ts";

import { fsselect } from "./mod.ts";

Deno.test("if 'select * from .' works", async () => {
  const result = await fsselect("select * from .");
  assert(result.length === 18);
});

Deno.test("if 'select * from root' works", async () => {
  const result = await fsselect("select * from root");
  assert(result.length === 4);
});

Deno.test("if 'select * from root/test_folder_with_file' works", async () => {
  const result = await fsselect("select * from root/test_folder_with_file");
  assert(result.length === 1);
});

Deno.test("if 'select * from root/test_folder_with_files where size > 1000000' works", async () => {
  const result = await fsselect(
    "select * from root/test_folder_with_files where size > 1000000",
  );
  assert(result.length === 1);
  assert(result[0].name === "b-file-1MB.txt");
});

Deno.test("if 'select * from root where isDirectory = true' works", async () => {
  const result = await fsselect("select * from root where isDirectory = true");
  assert(result.length === 3);

  const names = result.map((i) => i.name as string);
  const expectedNames = [
    "test_folder_with_file",
    "test_folder_with_files",
    "test_folder_with_folder",
  ];
  assertArrayIncludes<string>(names, expectedNames);
});

Deno.test("if 'select * from root where isDirectory = false' works", async () => {
  const result = await fsselect("select * from root where isDirectory = false");
  assert(result.length === 1);
  assertEquals(result[0].name, "root.txt");
  assertEquals(result[0].isDirectory, false);
  assertEquals(result[0].isFile, true);
});

Deno.test("if 'select * from root where isDirectory <> false' works", async () => {
  const result = await fsselect("select * from root where isDirectory <> false");
  assert(result.length === 3);

  const names = result.map((i) => i.name as string);
  const expectedNames = [
    "test_folder_with_file",
    "test_folder_with_files",
    "test_folder_with_folder",
  ];
  assertArrayIncludes<string>(names, expectedNames);
});

Deno.test("if 'select * from root where isDirectory <> true' works", async () => {
  const result = await fsselect("select * from root where isDirectory <> true");
  assert(result.length === 1);
  assertEquals(result[0].name, "root.txt");
  assertEquals(result[0].isDirectory, false);
  assertEquals(result[0].isFile, true);
});

Deno.test("if 'select * from root where isFile = true' works", async () => {
  const result = await fsselect("select * from root where isFile = true");
  assert(result.length === 1);
  assertEquals(result[0].name, "root.txt");
  assertEquals(result[0].isDirectory, false);
  assertEquals(result[0].isFile, true);
});

Deno.test("if 'select * from root where isFile = false' works", async () => {
  const result = await fsselect("select * from root where isFile = false");
  assert(result.length === 3);

  const names = result.map((i) => i.name as string);
  const expectedNames = [
    "test_folder_with_file",
    "test_folder_with_files",
    "test_folder_with_folder",
  ];
  assertArrayIncludes<string>(names, expectedNames);
});

Deno.test("if 'select * from root where isFile <> true' works", async () => {
  const result = await fsselect("select * from root where isFile <> true");
  assert(result.length === 3);

  const names = result.map((i) => i.name as string);
  const expectedNames = [
    "test_folder_with_file",
    "test_folder_with_files",
    "test_folder_with_folder",
  ];
  assertArrayIncludes<string>(names, expectedNames);
});

Deno.test("if 'select * from root where isFile <> false' works", async () => {
  const result = await fsselect("select * from root where isFile <> false");
  assert(result.length === 1);
  assertEquals(result[0].name, "root.txt");
  assertEquals(result[0].isDirectory, false);
  assertEquals(result[0].isFile, true);
});