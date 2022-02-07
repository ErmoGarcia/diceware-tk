const { playDiceware } = require('../diceware');
const { loadDicitionaryFromFile } = require('../utils/dictionary');
const { throwDices } = require('../utils/dice');
describe.each(['src/dictionaries/DW-Espanol-1.txt', 'src/dictionaries/DW-Espanol-2.txt'])('Playing Diceware', (filename) => {
    it('Creating a 5 words passphrase (default)', async () => {
        const dictionary = await loadDicitionaryFromFile(filename);
        const dices = throwDices();
        const passphrase = playDiceware(dictionary, dices);
        expect(passphrase).toHaveLength(5);
        passphrase.forEach(element => {
            expect(typeof element).toBe('string');
        });
    });
    it('Creating a 6 words passphrase', async () => {
        const dictionary = await loadDicitionaryFromFile(filename);
        const dices = throwDices();
        const passphrase = playDiceware(dictionary, dices, 6);
        expect(passphrase).toHaveLength(6);
        passphrase.forEach(element => {
            expect(typeof element).toBe('string');
        });
    });
});
