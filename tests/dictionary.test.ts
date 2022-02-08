import { loadDicitionaryFromFile } from '../src/utils/dictionary';

describe.each(['./dictionaries/DW-Espanol-1.txt', './dictionaries/DW-Espanol-2.txt'])('Dictionary operations', (filename) => {
  it('Parses dictionary into an holey array', async () => {
    const dictionary = await loadDicitionaryFromFile(filename)
    console.log(filename)
    console.log(dictionary)

    expect(dictionary.length).toBe(55556)
    // expect(dictionary[22156 - 11111]).toMatch(/alfa/)
    // expect(dictionary[22261 - 11111]).toBe('altar')
  })
})
