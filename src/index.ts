import { throwSingleDice, throwNDices } from './utils/dice'
import { loadDicitionaryFromFile } from './utils/dictionary'

export interface Diceware {
    dictFile: string;
    dictUrl: string;
    dictType: string;
    dices: number,
    words: number,
}

export class Diceware {
    constructor(dictFile = '', dictUrl = '', dictType = "array") {
        this.dictFile = dictFile
        this.dictUrl = dictUrl
        this.dictType = dictType
    }
}
