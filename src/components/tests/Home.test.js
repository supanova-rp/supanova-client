import { getHasNext, getHasNextAndPrev } from "./home-test-utils";

describe("Checks logic to identify whether a course has a next and/or previous video", () => {
  test("only has a previous video", () => {
    expect(getHasNext(3, 0)).toBe(false);
    expect(getHasNextAndPrev(3, 0)).toBe(false);
  });

  test("only has a next video", () => {
    expect(getHasNext(0, 1)).toBe(true);
    expect(getHasNextAndPrev(0, 1)).toBe(false);
  });

  test("has a next and prev video", () => {
    expect(getHasNextAndPrev(1, 0)).toBe(true);
  });
});
