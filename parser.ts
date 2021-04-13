import { createRequire } from "./deps.ts";

const require = createRequire(import.meta.url);

const parser = require("./peg-parser.js");

export default parser;