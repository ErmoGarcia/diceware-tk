const { loadDicitionaryFromFile } = require('../utils/dictionary');
const isndarray = require('isndarray');
describe.each(['src/dictionaries/DW-Espanol-1.txt', 'src/dictionaries/DW-Espanol-2.txt'])('Dictionary operations', (filename) => {
    it('parses each line into a 5 dimensional array', async () => {
        const dictionary = await loadDicitionaryFromFile(filename);
        expect(dictionary.size).toBe(7776);
        expect(dictionary.dimension).toBe(5);
        expect(isndarray(dictionary)).toBeTruthy();
        // expect(dictionary.get(2, 2, 1, 5, 6)).toBe('alfa')
        // expect(dictionary.get(2, 2, 2, 6, 1)).toBe('altar')
    });
});
