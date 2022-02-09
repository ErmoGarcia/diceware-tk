import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { once } from 'events';

/**
 * Loads a wordlist from a file into a multidimensional array.
 * @param filename - Name of the file with the wordlist.
 * @returns A 5 dimensional array with every word from the wordlist.
 */
 export const readWordlistFromNetwork = (): void => {
  return
}

/**
 * Loads a wordlist from a file into a multidimensional array.
 * @param filename - Name of the file with the wordlist.
 * @returns An array with every word from the wordlist.
 */
 export const readWordlistFromFile = async (filename: string): Promise<string[]> => {

  // Read wordlist file
  const lines = await readLinesFromFile(filename)

  // Parse each line from the wordlist
  const wordlist: string[] = []
  lines.forEach(line => {

    const { index, word } = parseLineFromWordlist(line)

    if(word && index) { wordlist[baseXToDecimal(index)] = word }

  })

  return wordlist
}


/**
 * Returns an array with each line from a file
 * @param filename - Location of the file to read
 * @returns 
 */
export const readLinesFromFile = async (filename: string) => {
  // Create interface to read lines from file
  const rl = createInterface({ input: createReadStream(filename, 'utf-8'), crlfDelay: Infinity })

  // Parse each line when read
  const lines: string[] = []
  rl.on('line', (line) => { lines.push(line) })

  // Wait until the interface is closed
  await once(rl, 'close')

  return lines
}


/**
 * Converts a number from base X to base 10.
 * @param {number} input - The number to convert.
 * @param {number} base - The original base.
 * @returns the input number converted to base 10.
 */
export const baseXToDecimal = (input: number, base = 6, offset = 11111): number => {
  // Apply offset
  input = input - offset

  //  Convert input number to array of digits in inverse order
  const digits: number[] = [...input.toString()].reverse().map(digit => { return parseInt(digit) })

  // Multiply each digit and elevate the base to the power of its position
  const result = digits.reduce((previousValue, currentValue, currentIndex) => {
    return previousValue + currentValue * Math.pow(base, currentIndex)
  })

  return result
}

interface parsedLine {
  index?: number,
  word?: string
}

/**
 * Extracts the index and the word from each line in the wordlist.
 * @param line - A line from a wordlist.
 * @returns An object with an index (digits between 1 and 6) and a word.
 */
export const parseLineFromWordlist = (line: string): parsedLine => {
  const filteredLine = line.replace(/[\0]/g, "")
  const matches = [...filteredLine.matchAll(/([1-6]{5})\s*([\p{L}\d]+)/gu)]
  const parsedLine: parsedLine = {};

  matches.forEach(match => {
    parsedLine["index"] = parseInt(match[1])
    parsedLine["word"] = match[2]
  });

  return parsedLine;
}






