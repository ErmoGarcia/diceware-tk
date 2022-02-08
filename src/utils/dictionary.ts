import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { once } from 'events';
import ndarray from 'ndarray';

/**
 * Extracts the indices (necessary results from the dice) and the word from each line.
 * @param line - A line from a dictionary file.
 * @returns An array with two values: with a list of indices (array of 5 numbers) and a word.
 */
const parseLine = (dictionary: ndarray.NdArray<string[]>, line: string) => {
  const [ parsedIndices, word ] = line.split('\t')

  const indices: number[] = Array.from(parsedIndices).map(element => { return parseInt(element) })

  dictionary.set(...indices, word)
}

/**
 * Loads a dictionary from a file into a multidimensional array.
 * @param filename - Name of the file with the dictionary.
 * @returns A 5 dimensional array with every word from the dictionary.
 */
export const loadDicitionaryFromFile = async (filename = 'src/dictionaries/DW-Espanol-1.txt'): Promise<ndarray.NdArray<string[]>> => {
  // Create interface to read lines from file
  const rl = createInterface({ input: createReadStream(filename, 'utf-8'), crlfDelay: Infinity })

  // Initialize dictionary
  const dictionary: ndarray.NdArray<string[]> = ndarray(Array(6 ** 5).fill(''), Array(5).fill(6))

  // Parse each line when read
  rl.on('line', (line) => { parseLine(dictionary, line) })

  // Wait until the interface is closed
  await once(rl, 'close')

  return dictionary
}

/**
 * Loads a dictionary from a file into a multidimensional array.
 * @param filename - Name of the file with the dictionary.
 * @returns A 5 dimensional array with every word from the dictionary.
 */
 export const loadDicitionaryFromNetwork = (): void => {
   return
}