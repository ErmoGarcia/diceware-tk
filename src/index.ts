import { throwNDices } from "./utils/dice"
import { baseXToDecimal, readWordlistFromFile, readWordlistFromNetwork } from "./utils/wordlist"

/**
 * Gets the corresponding word from a wordlist given a set of values obtained from dices.
 * @param dices - An array containing the values obtained from the dices.
 * @param wordlist - The wordlist used to get the words.
 * @param localfile - Wheter the dictionary comes from a local file or a URL.
 * @returns a word from the specified wordlist.
 */
export const getRandomWord = async (dices: number[], wordlist = 'https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt', localfile = false): Promise<string> => {
    const index = baseXToDecimal(parseInt(dices.join()))

    if(localfile) {
        const list = await readWordlistFromFile(wordlist)
        return list[index]
    }

    else {
        const list = await readWordlistFromNetwork(wordlist)
        return list[index]
    }
}

/**
 * Gets random words from the wordlist, forming a secure passphrase.
 * @param nWords - Number of words to return.
 * @param nDices - Number of dices used per entry in the wordlist (must be coherent with the wordlist used).
 * @param wordlist - The wordlist used to get the words.
 * @param localfile - Wheter the dictionary comes from a local file or a URL.
 * @returns an array with random words to form a passphrase.
 */
export const getPassphrase = async (nWords = 5, nDices = 5, wordlist = 'https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt', localfile = false): Promise<string[]> => {
    const dices = await throwNDices(nDices)
    return await Promise.all(Array(nWords).fill(getRandomWord(dices, wordlist, localfile)))
}