import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.82.0/testing/asserts.ts";

import { IQuery } from "./types.ts";
import { select } from "./select.ts";

Deno.test("if an empty array is returned when the folder is missing", async () => {
  const query: IQuery = {
    type: "select",
    fields: ["*"],
    from: "missing-folder",
    where: null,
  };

  const result = await select(query);

  assert(result.length === 0);
});

Deno.test("if an empty array is returned when the path is a file", async () => {
  const query: IQuery = {
    type: "select",
    fields: ["*"],
    from: "select_test.ts",
    where: null,
  };

  const result = await select(query);

  assert(result.length === 0);
});

Deno.test("if an existing file entry is returned when the path is a correct folder", async () => {
  const query: IQuery = {
    type: "select",
    fields: ["*"],
    from: "root/test_folder_with_file",
    where: null,
  };

  const result = await select(query);

  assert(result.length === 1);
  assertEquals(result[0].name, "a-file.txt");
  assertEquals(result[0].size, 12);
  assertEquals(result[0].isFile, true);
  assertEquals(result[0].isDirectory, false);
  assertEquals(result[0].isSymlink, false);
  assert(result[0].accessedAt);
  assert(result[0].createdAt);
  assert(result[0].modifiedAt);
});

Deno.test("if an existing directory entry is returned when the path is a correct folder", async () => {
  const query: IQuery = {
    type: "select",
    fields: ["*"],
    from: "root/test_folder_with_folder",
    where: null,
  };

  const result = await select(query);

  assert(result.length === 1);
  assertEquals(result[0].name, "a-folder");
  assertEquals(result[0].isFile, false);
  assertEquals(result[0].isDirectory, true);
  assertEquals(result[0].isSymlink, false);
  assert(result[0].accessedAt);
  assert(result[0].createdAt);
  assert(result[0].modifiedAt);
});

Deno.test("if a 1MB file is returned when the where clause is correct", async () => {
  const query: IQuery = {
    type: "select",
    fields: ["*"],
    from: "root/test_folder_with_files",
    where: {
      conditions: [
        {
          left: "size",
          op: "GreaterThan",
          right: 1000000,
        },
      ],
    },
  };

  const result = await select(query);

  assert(result.length === 1);
  assertEquals(result[0].name, "b-file-1MB.txt");
  assertEquals(result[0].isFile, true);
  assertEquals(result[0].isDirectory, false);
  assertEquals(result[0].isSymlink, false);
  assert(result[0].accessedAt);
  assert(result[0].createdAt);
  assert(result[0].modifiedAt);
});
