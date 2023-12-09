import { type EqualsFunc } from "./entities.ts";

const compare = <T>(
  items: Record<string, T>,
  others: Record<string, T>,
  isEquals: EqualsFunc<T>,
): Record<string, T> => {
  const result: Record<string, T> = {};

  for (const [key, item] of Object.entries(items)) {
    const other = others[key];
    const equalsResult = isEquals(item, other);

    if (!equalsResult) {
      result[key] = item;
    }
  }

  return result;
};

export const getDiff = <T extends { id: number }>(
  list1: T[],
  list2: T[],
  equalsFn: EqualsFunc<T>,
) => {
  const list1Map = list1.reduce<Record<string, T>>((acc, item) => {
    acc[item.id.toString()] = item;
    return acc;
  }, {});

  const list2Map = list2.reduce<Record<string, T>>((acc, item) => {
    acc[item.id.toString()] = item;
    return acc;
  }, {});

  const list1Diff = compare(list1Map, list2Map, equalsFn);
  const list2Diff = compare(list2Map, list1Map, equalsFn);
  const uniq = compare(list1Diff, list2Diff, (_, s) => !s);

  return uniq;
};

export const isDiffEmpty = (diff: Record<string | number | symbol, unknown>) => {
  return Object.keys(diff).length === 0;
};
