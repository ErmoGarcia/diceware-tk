const { readFile, parseLine, loadDicitionaryFromFile } = require('../utils/dictionary')
const isndarray = require('isndarray')

describe('Dictionary operations', () => {
    const filename = 'src/dictionaries/DW-Espanol-1.txt'

    it('reads lines from a txt file', async () => {
        const dictionary_txt = await readFile(filename)
        expect(dictionary_txt.length).toBe(7776)
    })

    it('parses a line from a dict file', async () => {
        const dictionary_txt = await readFile(filename)
        dictionary_txt.forEach(line => {
            const [indices, value] = parseLine(line)
            expect(indices.length).toBe(5)
            expect(typeof value).toBe('string')
            indices.forEach(index => {
                expect(index).toBeGreaterThanOrEqual(1)
                expect(index).toBeLessThanOrEqual(6)
                expect(index % 1).toBe(0)
            })
        })
    })

    it('parses each line into a 5 dimensional array', async () => {
        const dictionary = await loadDicitionaryFromFile(filename)
        expect(dictionary.size).toBe(7776)
        expect(dictionary.dimension).toBe(5)
        expect(isndarray(dictionary)).toBeTruthy()
        expect(dictionary.get(2,2,1,5,6)).toBe("alfa")
        expect(dictionary.get(2,2,2,6,1)).toBe("altar")
    })
})