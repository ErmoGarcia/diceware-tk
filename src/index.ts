import { throwNDices } from "./utils/dice"
import { baseXToDecimal, readWordlistFromFile, readWordlistFromNetwork } from "./utils/wordlist"

export const getRandomWord = async (dices: number[], wordlist: string, localfile: boolean): Promise<string> => {
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

export const getPassphrase = async (nWords = 5, nDices = 5, wordlist = 'https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt', localfile = false): Promise<string[]> => {
    const dices = await throwNDices(nDices)
    return await Promise.all(Array(nWords).fill(getRandomWord(dices, wordlist, localfile)))
}