import { assertEquals, assertThrows } from "./deps.ts";
import { IDirEntry, IWhereClause } from "./types.ts";
import { where } from "./where.ts";

Deno.test("if the empty where clause returns true", () => {
  const entry: IDirEntry = {};
  const whereClause: IWhereClause | null = null;
  const actual = where(entry, whereClause);
  assertEquals(actual, true);
});

Deno.test("if the 'where size > 10000' clause returns the entry", () => {
  const entry: IDirEntry = {
    size: 20000,
  };
  const whereClause: IWhereClause = {
    conditions: [
      {
        left: "size",
        op: "GreaterThan",
        right: 10000,
      },
    ],
  };
  const actual = where(entry, whereClause);
  assertEquals(actual, true);
});

Deno.test("if the 'where size > 10000' clause does not return the entry", () => {
  const entry: IDirEntry = {
    size: 5000,
  };
  const whereClause: IWhereClause = {
    conditions: [
      {
        left: "size",
        op: "GreaterThan",
        right: 10000,
      },
    ],
  };
  const actual = where(entry, whereClause);
  assertEquals(actual, false);
});

Deno.test("if the 'where size < 10000' clause returns the entry", () => {
  const entry: IDirEntry = {
    size: 5000,
  };
  const whereClause: IWhereClause = {
    conditions: [
      {
        left: "size",
        op: "LessThan",
        right: 10000,
      },
    ],
  };
  const actual = where(entry, whereClause);
  assertEquals(actual, true);
});

Deno.test("if the 'where size < 10000' clause does not return the entry", () => {
  const entry: IDirEntry = {
    size: 20000,
  };
  const whereClause: IWhereClause = {
    conditions: [
      {
        left: "size",
        op: "LessThan",
        right: 10000,
      },
    ],
  };
  const actual = where(entry, whereClause);
  assertEquals(actual, false);
});

Deno.test("if the 'where size = 10000' clause returns the entry", () => {
  const entry: IDirEntry = {
    size: 10000,
  };
  const whereClause: IWhereClause = {
    conditions: [
      {
        left: "size",
        op: "Equal",
        right: 10000,
      },
    ],
  };
  const actual = where(entry, whereClause);
  assertEquals(actual, true);
});

Deno.test("if the 'where size = 10000' clause does not return the entry", () => {
  const entry: IDirEntry = {
    size: 20000,
  };
  const whereClause: IWhereClause = {
    conditions: [
      {
        left: "size",
        op: "Equal",
        right: 10000,
      },
    ],
  };
  const actual = where(entry, whereClause);
  assertEquals(actual, false);
});

Deno.test("if the 'where size <> 10000' clause returns the entry", () => {
  const entry: IDirEntry = {
    size: 20000,
  };
  const whereClause: IWhereClause = {
    conditions: [
      {
        left: "size",
        op: "Different",
        right: 10000,
      },
    ],
  };
  const actual = where(entry, whereClause);
  assertEquals(actual, true);
});

Deno.test("if the 'where size <> 10000' clause does not return the entry", () => {
  const entry: IDirEntry = {
    size: 10000,
  };
  const whereClause: IWhereClause = {
    conditions: [
      {
        left: "size",
        op: "Different",
        right: 10000,
      },
    ],
  };
  const actual = where(entry, whereClause);
  assertEquals(actual, false);
});

Deno.test("if the 'where size like 10000' throws the unsupported exception", () => {
  const entry: IDirEntry = {
    size: 10000,
  };
  const whereClause: IWhereClause = {
    conditions: [
      {
        left: "size",
        op: "Like",
        right: 10000,
      },
    ],
  };
  assertThrows(
    () => where(entry, whereClause),
    Error,
    "The operation 'Like' is not supported for the 'size' property",
  );
});
