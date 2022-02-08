import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { once } from 'events';
import ndarray from 'ndarray';

// /**
//  * Extracts the indices (necessary results from the dice) and the word from each line.
//  * @param line - A line from a dictionary file.
//  * @returns An array with two values: with a list of indices (array of 5 numbers) and a word.
//  */
// const parseLine = (dictionary: ndarray.NdArray<string[]>, line: string) => {
//   const [ parsedIndices, word ] = line.split('\t')

//   const indices: number[] = Array.from(parsedIndices).map(element => { return parseInt(element) })

//   dictionary.set(...indices, word)
// }

// /**
//  * Loads a dictionary from a file into a multidimensional array.
//  * @param filename - Name of the file with the dictionary.
//  * @returns A 5 dimensional array with every word from the dictionary.
//  */
// export const loadDicitionaryFromFile = async (filename = 'src/dictionaries/DW-Espanol-1.txt'): Promise<ndarray.NdArray<string[]>> => {
//   // Create interface to read lines from file
//   const rl = createInterface({ input: createReadStream(filename, 'utf-8'), crlfDelay: Infinity })

//   // Initialize dictionary
//   const dictionary: ndarray.NdArray<string[]> = ndarray(Array(6 ** 5).fill(''), Array(5).fill(6))

//   // Parse each line when read
//   rl.on('line', (line) => { parseLine(dictionary, line) })

//   // Wait until the interface is closed
//   await once(rl, 'close')

//   return dictionary
// }


/**
 * Loads a dictionary from a file into a multidimensional array.
 * @param filename - Name of the file with the dictionary.
 * @returns A 5 dimensional array with every word from the dictionary.
 */
 export const readDicitionaryFromNetwork = (): void => {
  return
}


/**
 * Loads a dictionary from a file into a multidimensional array.
 * @param filename - Name of the file with the dictionary.
 * @returns A 5 dimensional array with every word from the dictionary.
 */
 export const readDicitionaryFromFile = async (filename = './dictionaries/DW-Espanol-1.txt'): Promise<string[]> => {

  // Create interface to read lines from file
  const rl = createInterface({ input: createReadStream(filename, 'utf-8'), crlfDelay: Infinity })

  // Initialize dictionary
  const dictionary: string[] = Array()

  // Parse each line when read
  rl.on('line', (line) => {

    const { index, word } = parseDictionaryLine(line)

    if(word !== "" && index > -1) {
      dictionary[baseXToDecimal(index)] = word
    }
  })

  // Wait until the interface is closed
  await once(rl, 'close')

  return dictionary
}



export const baseXToDecimal = (input: number, base = 6): number => {
  //  Convert input number to array of digits in inverse order
  const digits: number[] = [...input.toString()].reverse().map(digit => { return parseInt(digit) })

  // Multiply each digit and elevate the base to the power of its position
  const result = digits.reduce((previousValue, currentValue, currentIndex) => {
    return previousValue + currentValue * Math.pow(base, currentIndex)
  })

  return result
}


/**
 * Extracts the indices (necessary results from the dice) and the word from each line.
 * @param line - A line from a dictionary file.
 * @returns An array with two values: with a list of indices (array of 5 numbers) and a word.
 */
export const parseDictionaryLine = (line: string): {index: number, word: string} => {

  [...line.matchAll(/([1-6]{5})\s*([\p{L}\d]*)/g)].forEach(match => {
    const parsedLine = {index: parseInt(match[1]), word: match[2]};
    return parsedLine
  });

  return {index: -1, word: ""}
}


// export const addWordToDictionary = (dictionary: string[], index: string, word: string) => {
//   const indices: number[] = Array.from(index).map(element => { return parseInt(element) - 1 })

//   const mappedIndex = baseXToDecimal(indices)

//   dictionary[mappedIndex] = word
// }






