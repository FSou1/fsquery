import { IDirEntry, IWhereClause, IWhereCondition } from "./types.ts";

export function where(entry: IDirEntry, where: IWhereClause | null): boolean {
  const conditions = where?.conditions;
  if (!conditions?.length) {
    return true;
  }

  for (const condition of conditions) {
    if (!meet(entry, condition)) {
      return false;
    }
  }

  return true;
}

function meet(entry: IDirEntry, condition: IWhereCondition): boolean {
  const { left, op, right } = condition;

  if (left === "size") {
    const operations = {
      "GreaterThan": greaterThan,
      "LessThan": lessThan,
      "Equal": equal,
      "Different": different,
      "Like": null,
    };

    const operation = operations[op];
    if (!operation) {
      throw new Error(
        `The operation '${op}' is not supported for the '${left}' property`,
      );
    }

    return operation(entry.size, <number> right);
  } else if (left === "isDirectory") {
    const operations = {
      "GreaterThan": null,
      "LessThan": null,
      "Equal": equalBoolean,
      "Different": differentBoolean,
      "Like": null,
    };

    const operation = operations[op];
    if (!operation) {
      throw new Error(
        `The operation '${op}' is not supported for the '${left}' property`,
      );
    }

    return operation(entry.isDirectory, JSON.parse(right as string));
  } else if (left === "isFile") {
    const operations = {
      "GreaterThan": null,
      "LessThan": null,
      "Equal": equalBoolean,
      "Different": differentBoolean,
      "Like": null,
    };

    const operation = operations[op];
    if (!operation) {
      throw new Error(
        `The operation '${op}' is not supported for the '${left}' property`,
      );
    }

    return operation(entry.isFile, JSON.parse(right as string));
  } else if (left === "name") {
    const operations = {
      "GreaterThan": null,
      "LessThan": null,
      "Equal": equalString,
      "Different": differentString,
      "Like": null,
    };

    const operation = operations[op];
    if (!operation) {
      throw new Error(
        `The operation '${op}' is not supported for the '${left}' property`,
      );
    }

    return operation(entry.name, right as string);
  }

  return false;
}

/* Number */
function greaterThan(left: number | undefined, right: number): boolean {
  return typeof left !== "undefined" && left > right;
}

function lessThan(left: number | undefined, right: number): boolean {
  return typeof left !== "undefined" && left < right;
}

function equal(left: number | undefined, right: number): boolean {
  return typeof left !== "undefined" && left === right;
}

function different(left: number | undefined, right: number): boolean {
  return typeof left !== "undefined" && left !== right;
}

/* Boolean */
function equalBoolean(left: boolean | undefined, right: boolean): boolean {
  return typeof left !== "undefined" && left === right;
}

function differentBoolean(left: boolean | undefined, right: boolean): boolean {
  return typeof left !== "undefined" && left !== right;
}

/* String */
function equalString(left: string | undefined, right: string): boolean {
  return typeof left !== "undefined" && left === right;
}

function differentString(left: string | undefined, right: string): boolean {
  return typeof left !== "undefined" && left !== right;
}
