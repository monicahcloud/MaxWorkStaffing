export function nullsToEmptyStrings<T extends Record<string, any>>(obj: T): T {
  const out: any = {};
  for (const key in obj) {
    if (obj[key] === null) {
      out[key] = "";
    } else if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      out[key] = nullsToEmptyStrings(obj[key]);
    } else if (Array.isArray(obj[key])) {
      out[key] = obj[key].map((item: any) =>
        typeof item === "object" && item !== null
          ? nullsToEmptyStrings(item)
          : item
      );
    } else {
      out[key] = obj[key];
    }
  }
  return out;
}
