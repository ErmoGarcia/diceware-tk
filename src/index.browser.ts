import { throwNDices } from "./utils/dice"
import { computeIndex, parseLineFromWordlist, readWordlist, readWordlistFromNetwork } from "./utils/wordlist.browser"

/**
 * Gets the corresponding word from a wordlist given a set of values obtained from dices.
 * @param {number[]} dices - The array of values obtained from the dices.
 * @param {string[]} wordlist - The wordlist array used to get the word.
 * @returns {string} A word from the specified wordlist.
 */
export const getWord = (dices: number[], wordlist: string[]): string => {
    const index  = parseInt(dices.join(""))
    const arrayIndex = computeIndex(index)

    return wordlist[arrayIndex]
}

/**
 * Gets random words from the wordlist, forming a secure passphrase.
 * @async
 * @param {number} [nWords=6] - Number of words to return.
 * @param {number} [nDices=5] - Number of dices used per entry in the wordlist (must be coherent with the wordlist used).
 * @param {string} [wordlistLocation='https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt'] - The location wordlist used to get the words.
 * @param {boolean} [localfile=false] - Wheter the location of the wordlist is a local file or a URL.
 * @returns {Promise<string[]>} An array with random words to form a passphrase.
 */
export const getPassphrase = async (nWords = 6, nDices = 5, wordlistLocation = 'https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt', localfile = false): Promise<string[]> => {

    const dices = await throwNDices(nDices)
    const wordlist = await readWordlist(wordlistLocation, localfile)

    return await Promise.all(Array(nWords).fill(getWord(dices, wordlist)))
}

export { throwNDices, computeIndex, parseLineFromWordlist, readWordlistFromNetwork, readWordlist }