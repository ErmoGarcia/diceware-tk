import { readWordlistFromNetwork, readWordlistFromFile, parseLineFromWordlist, baseXToDecimal, readLinesFromFile  } from '../src/utils/wordlist';

describe.each(['https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt'])('Read wordlist from URL', (url) => {

  it("Reads wordlist from file and loads it into an array", async () => {
    const wordlist = await readWordlistFromNetwork(url)
    expect(wordlist).toHaveLength(6**5)
  })
})

describe.each(['./dictionaries/DW-Espanol-1.txt', './dictionaries/DW-Espanol-2.txt'])('Read wordlist from file', (filename) => {

  it("Reads lines from a file", async () => {
    const lines = await readLinesFromFile(filename)
    expect(lines).toBeTruthy();    
    expect(parseLineFromWordlist(lines[0])).toEqual({index: 11111, word: "0"})
  })

  it("Reads wordlist from file and loads it into an array", async () => {
    const wordlist = await readWordlistFromFile(filename)
    expect(wordlist).toHaveLength(6**5)
  })
})

describe('Wordlist operations', () => {

  it("Parses a line from a wordlist", () => {
    expect(parseLineFromWordlist("11111   agua")).toEqual({index: 11111, word: "agua"})
    expect(parseLineFromWordlist("11363	104	")).toEqual({index: 11363, word: "104"})
    expect(parseLineFromWordlist("44542	lupia	")).toEqual({index: 44542, word: "lupia"})
    expect(parseLineFromWordlist("32533	desde	")).toEqual({index: 32533, word: "desde"})
    expect(parseLineFromWordlist("34241   estés	")).toEqual({index: 34241, word: "estés"})
    expect(parseLineFromWordlist("54652   psé	")).toEqual({index: 54652, word: "psé"})
    expect(parseLineFromWordlist("55166   puñal	")).toEqual({index: 55166, word: "puñal"})
  })

  it("Converts a number from base x to decimal", () => {
    expect(baseXToDecimal(11111)).toBe(0)
    expect(baseXToDecimal(41245, 6, 0)).toBe(5501)
    expect(baseXToDecimal(2341234120, 6, 0)).toBe(26380992)
    expect(baseXToDecimal(403120, 6, 0)).toBe(31800)
    expect(baseXToDecimal(3012, 4, 0)).toBe(198)
    expect(baseXToDecimal(100110111, 2, 0)).toBe(311)
  })
})