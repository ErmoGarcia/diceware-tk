
import axios from 'axios';

/**
 * Gets a wordlist from a URL and maps it into an array.
 * @param url - URL of the file with the wordlist.
 * @returns an array with every word from the wordlist.
 */
 export const readWordlistFromNetwork = async (url: string): Promise<string[]> => {
  const response = await axios.get(url)

  if(response.data) {
    const lines = response.data.split('\n').filter((line: string) => {return line})
    return lines
  }

  else {
    return []
  }
}

/**
 * Converts a number from base X to base 10.
 * @param {number} input - The number to convert.
 * @param {number} base - The original base.
 * @param {number} offset - The offset to substract from the input number.
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
 * @returns an object with an index (digits between 1 and 6) and a word.
 */
export const parseLineFromWordlist = (line: string): parsedLine => {

  // Filter null characters
  const filteredLine = line.replace(/[\0]/g, "")

  // Match index and word with RegExp
  const matches = [...filteredLine.matchAll(/([1-6]{5})\s*([\p{L}\d]+)/gu)]


  const parsedLine: parsedLine = {};
  matches.forEach(match => {
    parsedLine["index"] = parseInt(match[1])
    parsedLine["word"] = match[2]
  });

  return parsedLine;
}






