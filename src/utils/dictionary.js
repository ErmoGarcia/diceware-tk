"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadDicitionaryFromFile = void 0;
const readline_1 = require("readline");
const fs_1 = require("fs");
const events_1 = require("events");
const ndarray = require("ndarray");
/**
 * Extracts the indices (necessary results from the dice) and the word from each line.
 * @param line - A line from a dictionary file.
 * @returns An array with two values: with a list of indices (array of 5 numbers) and a word.
 */
const parseLine = (dictionary, line) => {
    const [parsedIndices, word] = line.split('\t');
    const indices = Array.from(parsedIndices).map(element => { return parseInt(element); });
    dictionary.set(...indices, word);
};
/**
 * Loads a dictionary from a file into a multidimensional array.
 * @param filename - Name of the file with the dictionary.
 * @returns A 5 dimensional array with every word from the dictionary.
 */
const loadDicitionaryFromFile = async (filename = 'src/dictionaries/DW-Espanol-1.txt') => {
    // Create interface to read lines from file
    const rl = (0, readline_1.createInterface)({ input: (0, fs_1.createReadStream)(filename, 'utf-8'), crlfDelay: Infinity });
    // Initialize dictionary
    const dictionary = ndarray(Array(6 ** 5).fill(''), Array(5).fill(6));
    // Parse each line when read
    rl.on('line', (line) => { parseLine(dictionary, line); });
    // Wait until the interface is closed
    await (0, events_1.once)(rl, 'close');
    return dictionary;
};
exports.loadDicitionaryFromFile = loadDicitionaryFromFile;
