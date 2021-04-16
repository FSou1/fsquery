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

    return operation(entry.size, right);
  }

  return false;
}

function greaterThan(
  left: number | undefined,
  right: number | string,
): boolean {
  return typeof left !== "undefined" && left > right;
}

function lessThan(left: number | undefined, right: number | string): boolean {
  return typeof left !== "undefined" && left < right;
}

function equal(left: number | undefined, right: number | string): boolean {
  return typeof left !== "undefined" && left === right;
}

function different(left: number | undefined, right: number | string): boolean {
  return typeof left !== "undefined" && left !== right;
}
