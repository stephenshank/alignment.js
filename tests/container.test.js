import {
  sum,
  cumulative_sum,
  get_translations
} from "../lib/components/Container.js";

test("Sum computation is correct", () => {
  const array = [1, 2, 3];
  expect(sum(array)).toEqual(6);
});

test("Cumulative sum computation is correct", () => {
  const array = [1, 2, 3];
  expect(cumulative_sum(array)).toEqual([1, 3, 6]);
});

test("Get translations performs proper calculation", () => {
  const widths = [200, 800, 300];
  expect(get_translations(widths)).toEqual([0, 200, 1000]);
});
