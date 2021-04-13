import { assertExists } from "https://deno.land/std@0.82.0/testing/asserts.ts";

import parser from "./parser.ts";

Deno.test("if the parser object is exported", async () => {
  assertExists(parser);
});

Deno.test("if the parser object exports the parse method", async () => {
  assertExists(parser.parse);
});
