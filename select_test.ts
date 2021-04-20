import {
  assert,
  assertArrayIncludes,
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

Deno.test("if 3 folders are returned when the where clause has isDirectory = true", async () => {
  const query: IQuery = {
    type: "select",
    fields: ["*"],
    from: "root",
    where: {
      conditions: [
        {
          left: "isDirectory",
          op: "Equal",
          right: "true",
        },
      ],
    },
  };

  const result = await select(query);

  assert(result.length === 3);
  const names = result.map((i) => i.name as string);
  const expectedNames = [
    "test_folder_with_file",
    "test_folder_with_files",
    "test_folder_with_folder",
  ];
  assertArrayIncludes<string>(names, expectedNames);
});

Deno.test("if the 'root.txt' is returned when the where clause has isDirectory = false", async () => {
  const query: IQuery = {
    type: "select",
    fields: ["*"],
    from: "root",
    where: {
      conditions: [
        {
          left: "isDirectory",
          op: "Equal",
          right: "false",
        },
      ],
    },
  };

  const result = await select(query);

  assert(result.length === 1);
  assertEquals(result[0].name, "root.txt");
  assertEquals(result[0].isDirectory, false);
  assertEquals(result[0].isFile, true);
});

Deno.test("if the 'root.txt' is returned when the where clause has isDirectory <> false", async () => {
  const query: IQuery = {
    type: "select",
    fields: ["*"],
    from: "root",
    where: {
      conditions: [
        {
          left: "isDirectory",
          op: "Different",
          right: "false",
        },
      ],
    },
  };

  const result = await select(query);

  assert(result.length === 3);
  const names = result.map((i) => i.name as string);
  const expectedNames = [
    "test_folder_with_file",
    "test_folder_with_files",
    "test_folder_with_folder",
  ];
  assertArrayIncludes<string>(names, expectedNames);
});

Deno.test("if 3 folders are returned when the where clause has isDirectory <> true", async () => {
  const query: IQuery = {
    type: "select",
    fields: ["*"],
    from: "root",
    where: {
      conditions: [
        {
          left: "isDirectory",
          op: "Different",
          right: "true",
        },
      ],
    },
  };

  const result = await select(query);

  assert(result.length === 1);
  assertEquals(result[0].name, "root.txt");
  assertEquals(result[0].isDirectory, false);
  assertEquals(result[0].isFile, true);
});

Deno.test("if 3 folders are returned when the where clause has isFile = true", async () => {
  const query: IQuery = {
    type: "select",
    fields: ["*"],
    from: "root",
    where: {
      conditions: [
        {
          left: "isFile",
          op: "Equal",
          right: "true",
        },
      ],
    },
  };

  const result = await select(query);

  assert(result.length === 1);
  assertEquals(result[0].name, "root.txt");
  assertEquals(result[0].isDirectory, false);
  assertEquals(result[0].isFile, true);
});

Deno.test("if the 'root.txt' is returned when the where clause has isFile = false", async () => {
  const query: IQuery = {
    type: "select",
    fields: ["*"],
    from: "root",
    where: {
      conditions: [
        {
          left: "isFile",
          op: "Equal",
          right: "false",
        },
      ],
    },
  };

  const result = await select(query);

  assert(result.length === 3);
  const names = result.map((i) => i.name as string);
  const expectedNames = [
    "test_folder_with_file",
    "test_folder_with_files",
    "test_folder_with_folder",
  ];
  assertArrayIncludes<string>(names, expectedNames);
});

Deno.test("if the 'root.txt' is returned when the where clause has isFile <> false", async () => {
  const query: IQuery = {
    type: "select",
    fields: ["*"],
    from: "root",
    where: {
      conditions: [
        {
          left: "isFile",
          op: "Different",
          right: "false",
        },
      ],
    },
  };

  const result = await select(query);

  assert(result.length === 1);
  assertEquals(result[0].name, "root.txt");
  assertEquals(result[0].isDirectory, false);
  assertEquals(result[0].isFile, true);
});

Deno.test("if 3 folders are returned when the where clause has isFile <> true", async () => {
  const query: IQuery = {
    type: "select",
    fields: ["*"],
    from: "root",
    where: {
      conditions: [
        {
          left: "isFile",
          op: "Different",
          right: "true",
        },
      ],
    },
  };

  const result = await select(query);

  assert(result.length === 3);
  const names = result.map((i) => i.name as string);
  const expectedNames = [
    "test_folder_with_file",
    "test_folder_with_files",
    "test_folder_with_folder",
  ];
  assertArrayIncludes<string>(names, expectedNames);
});

Deno.test("if the 'root.txt' is returned when the where clause has name = 'root.txt'", async () => {
  const query: IQuery = {
    type: "select",
    fields: ["*"],
    from: "root",
    where: {
      conditions: [
        {
          left: "name",
          op: "Equal",
          right: "root.txt",
        },
      ],
    },
  };

  const result = await select(query);

  assert(result.length === 1);
  assertEquals(result[0].name, "root.txt");
  assertEquals(result[0].isDirectory, false);
  assertEquals(result[0].isFile, true);
});

Deno.test("if a folder is returned when the where clause has name = 'test_folder_with_folder'", async () => {
  const query: IQuery = {
    type: "select",
    fields: ["*"],
    from: "root",
    where: {
      conditions: [
        {
          left: "name",
          op: "Equal",
          right: "test_folder_with_folder",
        },
      ],
    },
  };

  const result = await select(query);

  assert(result.length === 1);
  assertEquals(result[0].name, "test_folder_with_folder");
  assertEquals(result[0].isDirectory, true);
  assertEquals(result[0].isFile, false);
});








Deno.test("if the 'root.txt' is not returned when the where clause has name <> 'root.txt'", async () => {
  const query: IQuery = {
    type: "select",
    fields: ["*"],
    from: "root",
    where: {
      conditions: [
        {
          left: "name",
          op: "Different",
          right: "root.txt",
        },
      ],
    },
  };

  const result = await select(query);

  assert(result.length === 3);
  const names = result.map((i) => i.name as string);
  const expectedNames = [
    "test_folder_with_file",
    "test_folder_with_files",
    "test_folder_with_folder",
  ];
  assertArrayIncludes<string>(names, expectedNames);
});

Deno.test("if a folder is returned when the where clause has name <> 'test_folder_with_folder'", async () => {
  const query: IQuery = {
    type: "select",
    fields: ["*"],
    from: "root",
    where: {
      conditions: [
        {
          left: "name",
          op: "Different",
          right: "test_folder_with_folder",
        },
      ],
    },
  };

  const result = await select(query);

  assert(result.length === 3);
  const names = result.map((i) => i.name as string);
  const expectedNames = [
    "test_folder_with_file",
    "test_folder_with_files",
    "root.txt",
  ];
  assertArrayIncludes<string>(names, expectedNames);
});