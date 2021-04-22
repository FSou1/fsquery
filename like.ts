export function getLikeRegExp(input: string): RegExp {
  const pattern = input
    .replaceAll(".", "\\.")
    .replaceAll("%", ".*?");

  return new RegExp("^" + pattern + "$");
}
