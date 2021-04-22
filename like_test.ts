import { assert, assertEquals } from "./deps.ts";
import { getLikeRegExp } from "./like.ts";

Deno.test("where name like 'abc.txt'", () => {
  const regexp = getLikeRegExp("abc.txt");

  /* Match */
  assert("abc.txt".match(regexp));

  /* Does not match */
  assertEquals("a.txt".match(regexp), null);
  assertEquals("abc_d.txt".match(regexp), null);
  assertEquals("abc.tx".match(regexp), null);
});

Deno.test("where name like '%.txt'", () => {
  const regexp = getLikeRegExp("%.txt");

  /* Match */
  assert("abc.txt".match(regexp));
  assert("c.txt".match(regexp));
  assert("ab_c.txt".match(regexp));
  assert("ab_-\/*+ddc.txt".match(regexp));

  /* Does not match */
  assertEquals("abc.bin".match(regexp), null);
  assertEquals(".txn".match(regexp), null);
  assertEquals("abc_txt".match(regexp), null);
  assertEquals("abc.!txt".match(regexp), null);
  assertEquals("abc.txt_bin".match(regexp), null);
});

Deno.test("where name like '%.txt%'", () => {
  const regexp = getLikeRegExp("%.txt%");

  /* Match */
  assert("abc.txt".match(regexp));
  assert("c.txt".match(regexp));
  assert("ab_c.txt".match(regexp));
  assert("ab_-\/*+ddc.txt".match(regexp));

  /* Does not match */
  assertEquals("abc.bin".match(regexp), null);
  assertEquals(".txn".match(regexp), null);
  assertEquals("abc_txt".match(regexp), null);
});

Deno.test("where name like 'ab%txt'", () => {
  const regexp = getLikeRegExp("ab%txt");

  /* Match */
  assert("abc.txt".match(regexp));
  assert("abdef_.txt".match(regexp));
  assert("ab_c.txt".match(regexp));
  assert("ab_-\/*+ddc.txt".match(regexp));

  /* Does not match */
  assertEquals("abc.bin".match(regexp), null);
  assertEquals("abc".match(regexp), null);
  assertEquals("d_abc.txt".match(regexp), null);
  assertEquals("abc.txt.".match(regexp), null);
  assertEquals("abc.txt!".match(regexp), null);
});

Deno.test("where name like 'abc.%'", () => {
  const regexp = getLikeRegExp("abc.%");

  /* Match */
  assert("abc.txt".match(regexp));
  assert("abc.bin".match(regexp));
  assert("abc.".match(regexp));

  /* Does not match */
  assertEquals("abc".match(regexp), null);
  assertEquals("d".match(regexp), null);
  assertEquals("abc?.".match(regexp), null);
});

Deno.test("where name like '%.%'", () => {
  const regexp = getLikeRegExp("%.%");

  /* Match */
  assert("abc.txt".match(regexp));
  assert("abc.bin".match(regexp));
  assert("abc.".match(regexp));
  assert(".".match(regexp));
  assert(".txt".match(regexp));

  /* Does not match */
  assertEquals("abc".match(regexp), null);
});
