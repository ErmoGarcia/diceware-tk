"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { playDiceware } = require('../diceware');
const { loadDicitionaryFromFile } = require('../utils/dictionary');
const { throwDices } = require('../utils/dice');
describe.each(['src/dictionaries/DW-Espanol-1.txt', 'src/dictionaries/DW-Espanol-2.txt'])('Playing Diceware', (filename) => {
    it('Creating a 5 words passphrase (default)', () => __awaiter(void 0, void 0, void 0, function* () {
        const dictionary = yield loadDicitionaryFromFile(filename);
        const dices = throwDices();
        const passphrase = playDiceware(dictionary, dices);
        expect(passphrase).toHaveLength(5);
        passphrase.forEach(element => {
            expect(typeof element).toBe('string');
        });
    }));
    it('Creating a 6 words passphrase', () => __awaiter(void 0, void 0, void 0, function* () {
        const dictionary = yield loadDicitionaryFromFile(filename);
        const dices = throwDices();
        const passphrase = playDiceware(dictionary, dices, 6);
        expect(passphrase).toHaveLength(6);
        passphrase.forEach(element => {
            expect(typeof element).toBe('string');
        });
    }));
});
