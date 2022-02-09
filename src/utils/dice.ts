import randomNumber from "random-number-csprng";

/**
 * Generates n random dice results.
 * @param number - Number of dices thrown (default 5).
 * @param min - Min value on the dice (default 1).
 * @param max - Max value on the dice (default 6).
 * @returns an array of random numbers in the define range.
 */
export const throwNDices = async (number = 5, min = 1, max = 6): Promise<number[]> => {
  return await Promise.all(Array.from(Array(number), () => randomNumber(min, max)))
}
