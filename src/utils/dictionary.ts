import { createInterface } from 'readline'
import { createReadStream } from 'fs'
import { once } from 'events'
import ndarray = require('ndarray')

/**
 * Extracts the indices (necessary results from the dice) and the word from each line.
 * @param line - A line from a dictionary file.
 * @returns An array with two values: with a list of indices (array of 5 numbers) and a word.
 */
const parseLine = (dictionary: ndarray.GenericArray<string>, line: string) => {
  const [ parsedIndices, word ] = line.split('\t')

  const indices: number[] = Array.from(parsedIndices).map(element => { return parseInt(element) })

  dictionary.set(...indices, word)
}

/**
 * Loads a dictionary from a file into a multidimensional array.
 * @param filename - Name of the file with the dictionary.
 * @returns A 5 dimensional array with every word from the dictionary.
 */
const loadDicitionaryFromFile = async (filename = 'src/dictionaries/DW-Espanol-1.txt'): Promise<ndarray.GenericArray<string>> => {
  // Create interface to read lines from file
  const rl = createInterface({ input: createReadStream(filename, 'utf-8'), crlfDelay: Infinity })

  // Initialize dictionary
  const dictionary: ndarray.GenericArray<string> = ndarray(Array(6 ** 5).fill(''), Array(5).fill(6))
  console.log(typeof dictionary)

  // Parse each line when read
  rl.on('line', (line) => { parseLine(dictionary, line) })

  // Wait until the interface is closed
  await once(rl, 'close')

  return dictionary
}

exports.loadDicitionaryFromFile = loadDicitionaryFromFile
