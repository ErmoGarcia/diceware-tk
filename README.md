# Diceware Toolkit

A library to provide the necesary functions to properly implent Diceware.

## Features

This library provides the following features:

- Generating a cryptographically secure random passphrase from a wordlist using the [diceware](https://theworld.com/~reinhold/diceware.html) method.
- Loading any wordlist from a URL or a local file.
- Accessing to lower level functions useful for specific use cases.

## Getting started

To install the package:

`$ npm install diceware-tk`

or

`$ yarn add diceware-tk`


The *getPassphrase* function can be used to generate a secure passphrase. This is a high level function that returns an array with 6 random words from the [EFF wordlist](https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt):

```
import { getPassphrase } from 'diceware-tk';

const passphrase = getPassphrase()

console.log(passphrase.join())
```

## API Reference

Description for every available function:

- [Main functions](#main-functions)
    - [getPassphrase](#getPassphrase)
    - [getSingleWord](#getSingleWord)
- [Lower level functions](#lower-level-functions)
    - [throwNDices](#throwNDices)
    - [computeIndex](computeIndex)
    - [parseLineFromWordlist](parseLineFromWordlist)
    - [readWordlist](readWordlist)
    - [readWordlistFromFile](readWordlistFromNetwork)
    - [readWordlistFromNetwork](readWordlistFromFile)

### Main functions<a name="main-functions"/>

#### getPassphrase<a name="getPassphrase"/>

Gets random words from the wordlist, forming a secure passphrase. Returns an array with random words to form a passphrase.

| Param     | Type    | Description | Default |
| --- | --- | --- | --- |
| nWords    | number  | Number of words to return | 6 |
| nDices    | number  | Number of dices used per entry in the wordlist (must be coherent with the wordlist used) | 5 |
| wordlist  | string  | URL or local path of the wordlist used to get the words | "https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt" |
| localfile | boolean | Wheter the dictionary comes from a local file or a URL | false |

#### getSingleWord<a name="getSingleWord"/>

Gets the corresponding word from a wordlist given a set of values obtained from dices. Returns a word from the specified wordlist.

| Param     | Type      | Description                                             | Default |
| --- | --- | --- | --- |
| dices     | number[]  | An array containing the values obtained from the dices  | N/A |
| wordlist  | string    | URL or local path of the wordlist used to get the words | "https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt" |
| localfile | boolean   | Wheter the dictionary comes from a local file or a URL  | false |

### Lower level functions<a name="lower-level-functions"/>

#### throwNDices<a name="throwNDices"/>

Generates n random dice results.
Returns an array of random numbers in the define range.
It uses the [random-number-csprng](https://www.npmjs.com/package/random-number-csprng) library to generate the random numbers without bias.
This function offers the possibility of using dices with values different from 1 to 6.

| Param     | Type      | Description | Default |
| --- | --- | --- | --- |
| nDices | number | Number of dices thrown | 5 |
| min | number | Min value on the dice | 1 |
| max | number | Max value on the dice | 6 |

#### computeIndex<a name="computeIndex"/>

Converts a number from base X to base 10.
In a wordlist where words are obtained using 5 dices, the indices in the list cover all the possible dice results from 11111 to 66666.
After substracting an offset of 11111, the indices go from 00000 to 55555 (numbers in base 6).
These indices can be converted to decimals getting numbers in the range of 0 to 7776.
This is the method used to map the words in a wordlist to an array to make it simpler and faster to access them.
An index in the wordlist obtained by concatenating the results of the dices can be converted to the corresponding index of the array using this function.
The base and offset can be changed to accomodate to dices with values different from 1 to 6.

| Param  | Type   | Description                                   | Default |
| --- | --- | --- | --- |
| input  | number | The number to convert                         | N/A |
| base   | number | The original base                             | 6 |
| offset | number | The offset to substract from the input number | 11111 |

#### parseLineFromWordlist<a name="parseLineFromWordlist"/>

Parses a line in a wordlist, extracting the word and its index.
It uses the Regular Expresion to match the index and the word respectively: **/([1-6]{5})\s*([\p{L}\d]+)/gu**

| Param  | Type   | Description           | Default |
| --- | --- | --- | --- |
| line  | string | A line from a wordlist | N/A |

#### readWordlist<a name="readWordlist"/>

Loads a wordlist from a file or URL and maps it into an array.
As long as its format is similar to the [https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt](EFF wordlist), it should be able to load it.
It assumes the wordlist uses 5 regular dices, resulting in 7776 words.

| Param  | Type   | Description | Default |
| --- | --- | --- | --- |
| location  | string | URL or filename used to locate the wordlist | N/A |
| localfile  | boolean | Wheter the dictionary comes from a local file or a URL | N/A |

#### readWordlistFromNetwork<a name="readWordlistFromNetwork"/>

Loads a wordlist from a URL.
Returns an array with every line from the wordlist.

| Param  | Type   | Description | Default |
| --- | --- | --- | --- |
| wordlist  | string | URL of the wordlist used to get the words | N/A |


#### readWordlistFromFile<a name="readWordlistFromFile"/>

Loads a wordlist from a file.
Returns an array with every line from the wordlist.

| Param  | Type   | Description | Default |
| --- | --- | --- | --- |
| wordlist  | string | Local path of the wordlist used to get the words | N/A |

