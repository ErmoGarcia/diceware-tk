const readline = require('readline')
const fs = require('fs')
const ndarray = require("ndarray")

/**
 * Reads lines from a file.
 * @param filename - Name of the file to read.
 * @returns Each line of the file.
 */
const readFile = async (filename: string): Promise<string[]> => {
    const fileStream = fs.createReadStream(filename);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let lines = []
    for await (const line of rl) {
        lines.push(line)
    }
    return lines
}

/**
 * Extracts the indices (necessary results from the dice) and the word from each line.
 * @param line - A line from a dictionary file.
 * @returns An array with two values: with a list of indices (array of 5 numbers) and a word.
 */
const parseLine = (line: string): any[] => {
    const [ parsed_indices, word ] = line.split('\t')
    const indices = Array.from(parsed_indices).map(element => {return parseInt(element)})

    return [indices, word]
}

/**
 * Loads a dictionary from a file into a multidimensional array.
 * @param filename - Name of the file with the dictionary.
 * @returns A 5 dimensional array with every word from the dictionary.
 */
const loadDicitionaryFromFile = async (filename: string = 'src/dictionaries/DW-Espanol-1.txt'): Promise<string[][][][][]> => {
    const dictionary_txt = await readFile(filename)
    const dictionary = ndarray(Array(7776).fill(""), [6,6,6,6,6])
    dictionary_txt.forEach(line => {
        var [indices, word] = parseLine(line)
        dictionary.set(indices[0],indices[1], indices[2], indices[3], indices[4], word)
    });
    return dictionary
}

exports.readFile = readFile
exports.loadDicitionaryFromFile = loadDicitionaryFromFile
exports.parseLine = parseLine