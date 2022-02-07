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
const { loadDicitionaryFromFile } = require('../utils/dictionary');
const isndarray = require('isndarray');
describe.each(['src/dictionaries/DW-Espanol-1.txt', 'src/dictionaries/DW-Espanol-2.txt'])('Dictionary operations', (filename) => {
    it('parses each line into a 5 dimensional array', () => __awaiter(void 0, void 0, void 0, function* () {
        const dictionary = yield loadDicitionaryFromFile(filename);
        expect(dictionary.size).toBe(7776);
        expect(dictionary.dimension).toBe(5);
        expect(isndarray(dictionary)).toBeTruthy();
        // expect(dictionary.get(2, 2, 1, 5, 6)).toBe('alfa')
        // expect(dictionary.get(2, 2, 2, 6, 1)).toBe('altar')
    }));
});
