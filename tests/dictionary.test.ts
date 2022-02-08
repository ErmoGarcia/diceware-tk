import { readFileLines, parseFileLine, addWordToDictionary  } from '../src/utils/dictionary';

describe.each(['./dictionaries/DW-Espanol-1.txt', './dictionaries/DW-Espanol-2.txt'])('Dictionary operations', (filename) => {
  let lines: string[]

  it("Reads dictionary from file", async () => {
    lines = await readFileLines(filename)
    expect(lines.length).toBeGreaterThan(0)   
  })

  it("Parses lines from file", () => {
    lines.forEach(line => {
      const matches = parseFileLine(line)
      console.log(filename)
      console.log(line)
      console.log(matches)
      expect(matches).toHaveLength(1)

      matches.forEach(match => {
        expect(match).toHaveLength(2)
        const [ index, word ] = match
        expect(index).not.toBe("")
        expect(word).not.toBe("")
      });    
    })
  })

  const dictionary: string[] = Array(5**6).fill("")

  it("Adds words to dictionary", () => {
    lines.forEach(line => {
      const [ index, word ] = line
      addWordToDictionary(dictionary, index, word)
    })

    expect(dictionary.length).toBe(6**5)
    dictionary.forEach(word => {
      expect(word).not.toBe("")
    })
  })

  // it('Parses dictionary into an array', async () => {



  //   console.log(filename)
  //   console.log(dictionary)

  //   expect(dictionary.length).toBe(6**5)

  //   dictionary.forEach(elem => {
  //     expect(elem).not.toBe("")
  //   })
  //   // expect(dictionary[22156 - 11111]).toMatch(/alfa/)
  //   // expect(dictionary[22261 - 11111]).toBe('altar')
  // })
})
