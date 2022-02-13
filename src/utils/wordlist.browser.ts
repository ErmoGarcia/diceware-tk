import axios from 'axios';

/**
 * Loads a wordlist and maps it into an array.
 * @async
 * @param {string} location - URL or filename used to locate the wordlist.
 * @param {boolean} localfile - Wheter the dictionary comes from a local file or a URL.
 * @returns {Promise<string[]>} An array with every word from the wordlist.
 */
 export const readWordlist = async (location: string, localfile = false): Promise<string[]> => {

  let lines: string[]

  // Check wether the wordlist should be read from a local file or a URL
  if(localfile) {
    // Read wordlist file
    throw new Error("Functionality only available in Node.")
  } else {
    // Read wordlist file
    lines = await readWordlistFromNetwork(location)
  }
  
  // Parse each line from the wordlist
  const wordlist: string[] = []
  lines.forEach(line => {

    const { index, word } = parseLineFromWordlist(line)

    if(word && index) { wordlist[computeIndex(index)] = word }

  })

  return wordlist
}

/**
 * Gets a wordlist from a URL.
 * @param {string} url - URL of the file with the wordlist.
 * @returns {Promise<string[]>} An array with every line from the wordlist.
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
 * Converts a number from base X to base 10 (to be used as an index in the wordlist array).
 * @param {number} input - The number to convert.
 * @param {number} [base=6] - The original base.
 * @param {number} [offset=11111] - The offset to substract from the input number.
 * @returns {number} The input number converted to base 10.
 */
export const computeIndex = (input: number, base = 6, offset = 11111): number => {
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
 * @param {string} line - A line from a wordlist.
 * @returns {index?: number, word?: string} An object with an index (digits between 1 and 6) and a word.
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
