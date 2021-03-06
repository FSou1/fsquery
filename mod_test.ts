import { assert, assertArrayIncludes, assertEquals } from "./deps.ts";

import { fsselect } from "./mod.ts";

Deno.test("if 'select * from .' works", async () => {
  const result = await fsselect("select * from .");
  assert(result.length === 20);
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

Deno.test("if select * from root where name = 'test_folder_with_file' works", async () => {
  const result = await fsselect("select * from root where name = 'test_folder_with_file'");
  assert(result.length === 1);
  assertEquals(result[0].name, "test_folder_with_file");
  assertEquals(result[0].isDirectory, true);
});

Deno.test("if select * from root where name = 'root.txt' works", async () => {
  const result = await fsselect("select * from root where name = 'root.txt'");
  assert(result.length === 1);
  assertEquals(result[0].name, "root.txt");
  assertEquals(result[0].isFile, true);
});

Deno.test("if select * from root where name <> 'test_folder_with_file' works", async () => {
  const result = await fsselect("select * from root where name <> 'test_folder_with_file'");
  assert(result.length === 3);

  const names = result.map((i) => i.name as string);
  const expectedNames = [
    "root.txt",
    "test_folder_with_files",
    "test_folder_with_folder",
  ];
  assertArrayIncludes<string>(names, expectedNames);
});

Deno.test("if select * from root where name <> 'root.txt' works", async () => {
  const result = await fsselect("select * from root where name <> 'root.txt'");
  assert(result.length === 3);

  const names = result.map((i) => i.name as string);
  const expectedNames = [
    "test_folder_with_file",
    "test_folder_with_files",
    "test_folder_with_folder",
  ];
  assertArrayIncludes<string>(names, expectedNames);
});

Deno.test("if select * from root where name like 'test_%' works", async () => {
  const result = await fsselect("select * from root where name like 'test_%'");
  assert(result.length === 3);

  const names = result.map((i) => i.name as string);
  const expectedNames = [
    "test_folder_with_file",
    "test_folder_with_files",
    "test_folder_with_folder",
  ];
  assertArrayIncludes<string>(names, expectedNames);
});

Deno.test("if select * from root where name like '%folder%' works", async () => {
  const result = await fsselect("select * from root where name like '%folder%'");
  assert(result.length === 3);

  const names = result.map((i) => i.name as string);
  const expectedNames = [
    "test_folder_with_file",
    "test_folder_with_files",
    "test_folder_with_folder",
  ];
  assertArrayIncludes<string>(names, expectedNames);
});

Deno.test("if select * from root where name like '%.txt' works", async () => {
  const result = await fsselect("select * from root where name like '%.txt'");
  assert(result.length === 1);

  const names = result.map((i) => i.name as string);
  const expectedNames = [
    "root.txt"
  ];
  assertArrayIncludes<string>(names, expectedNames);
});

Deno.test("if select * from root where name like '%with_file%' works", async () => {
  const result = await fsselect("select * from root where name like '%with_file%'");
  assert(result.length === 2);

  const names = result.map((i) => i.name as string);
  const expectedNames = [
    "test_folder_with_file",
    "test_folder_with_files",
  ];
  assertArrayIncludes<string>(names, expectedNames);
});

Deno.test("if select * from root where name like 'some' does not return entries", async () => {
  const result = await fsselect("select * from root where name like 'some'");
  assert(result.length === 0);

  const names = result.map((i) => i.name as string);
  const expectedNames: string[] = [];
  assertArrayIncludes<string>(names, expectedNames);
});

Deno.test("if select * from root where name like '%%' works", async () => {
  const result = await fsselect("select * from root where name like '%%'");
  assert(result.length === 4);

  const names = result.map((i) => i.name as string);
  const expectedNames = [
    "test_folder_with_file",
    "test_folder_with_files",
    "test_folder_with_folder",
    "root.txt"
  ];
  assertArrayIncludes<string>(names, expectedNames);
});