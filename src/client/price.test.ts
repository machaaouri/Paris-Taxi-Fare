import { price } from "./price";

describe('Calculate ride price', () => {
    it('Price Test Case', () => {
      expect(price({
          id: 0,
          startTime: "2020-07-06T13:27",
          distance: 2,
          duration: 10
      })).toEqual(6);
    });
  });