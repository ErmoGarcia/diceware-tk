import randomNumber from "random-number-csprng";

/**
 * Generates n random dice results.
 * @async
 * @param {number} [nDices=5] - Number of dices thrown.
 * @param {number} [min=1] - Min value on the dice.
 * @param {number} [max=6] - Max value on the dice.
 * @returns {[Promise<number[]>]} An array of random numbers in the define range.
 */
export const throwNDices = async (nDices = 5, min = 1, max = 6): Promise<number[]> => {
  return await Promise.all(Array.from(Array(nDices), () => randomNumber(min, max)))
}
