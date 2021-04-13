import { createRequire } from "https://deno.land/std@0.92.0/node/module.ts";

const require = createRequire(import.meta.url);

const parser = require("./peg-parser.js");

export default parser;