import ndarray = require('ndarray')
import { throwSingleDiceUnsecure, throwSingleDiceSecure, throwDices } from './utils/dice'
import { loadDicitionaryFromFile } from './utils/dictionary'

export const playDiceware = (dictionary: ndarray.NdArray<string[]>, dices: number[], passwordLength = 5): string[] => {
    const passphrase = Array(passwordLength).map(() => {
        return dictionary.get(...dices)
    })

    return passphrase
}
