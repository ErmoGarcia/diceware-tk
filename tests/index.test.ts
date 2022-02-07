import { sum } from '../src';

describe("sum", () => {
  it("should return sum of two numbers", () => {
    expect(sum(1, 2)).toBe(3);
  })
});
