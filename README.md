# Diceware Toolkit

A library to provide the necesary functions to properly implent Diceware.

## Features

- Generate a cryptographically secure random passphrase from a wordlist using the [diceware](https://theworld.com/~reinhold/diceware.html) method
- Possibility of loading any wordlist from a URL or a local file
- Provides lower level functions to tweak some parameters like the numbers on the dice

## Getting started

To install the package:

`$ npm install diceware-tk`

or

`$ yarn add diceware-tk`

To get a list of 6 random words from the [https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt](EFF wordlist):

```
import { getPassphrase } from 'diceware-tk';

const passphrase = getPassphrase()

console.log(passphrase.join())
```

Words can also be retrieved one by one.
Physical dices can be used to generate the random values (which is the recommended way of doing it), then passed to the program to get the words. 
To get random words one at a time:

```
import { getSingleWord } from 'diceware-tk';

// Results from the physical dices were 4, 3, 4, 6, 3
const word = getSingleWord([4, 3, 4, 6, 3])

console.log(word)
```

## Reference

Description for every available function:

### Main functions

#### getPassphrase

Gets random words from the wordlist, forming a secure passphrase. Returns an array with random words to form a passphrase.

| Param     | Type    | Description | Default |
| --- | --- | --- | --- |
| nWords    | number  | Number of words to return | 6 |
| nDices    | number  | Number of dices used per entry in the wordlist (must be coherent with the wordlist used) | 5 |
| wordlist  | string  | URL or local path of the wordlist used to get the words | https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt |
| localfile | boolean | Wheter the dictionary comes from a local file or a URL | false |

#### getSingleWord

Gets the corresponding word from a wordlist given a set of values obtained from dices. Returns a word from the specified wordlist.

| Param     | Type      | Description                                             | Default |
| --- | --- | --- | --- |
| dices     | number[]  | An array containing the values obtained from the dices  | N/A |
| wordlist  | string    | URL or local path of the wordlist used to get the words | https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt |
| localfile | boolean   | Wheter the dictionary comes from a local file or a URL  | false |

### Lower level functions

#### throwNDices

Generates n random dice results.
Returns an array of random numbers in the define range.
It uses the [random-number-csprng](https://www.npmjs.com/package/random-number-csprng) library to generate the random numbers without bias.
This function offers the possibility of using dices with values different from 1 to 6.

| Param     | Type      | Description | Default |
| --- | --- | --- | --- |
| nDices | number | Number of dices thrown | 5 |
| min | number | Min value on the dice | 1 |
| max | number | Max value on the dice | 6 |

#### baseXToDecimal

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

#### parseLineFromWordlist

Parses a line in a wordlist, extracting the word and its index.

| Param  | Type   | Description           | Default |
| --- | --- | --- | --- |
| line  | string | A line from a wordlist | N/A |

#### readWordlistFromFile

Loads a wordlist from a file and maps it into an array.
As long as its format is similar to the [https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt](EFF wordlist), it should be able to load it.
It assumes the wordlist uses 5 regular dices, resulting in 7776 words.

| Param  | Type   | Description                                                | Default |
| --- | --- | --- | --- |
| wordlist  | string | URL or local path of the wordlist used to get the words | N/A |

#### readWordlistFromNetwork

Loads a wordlist from a URL and maps it into an array.
As long as its format is similar to the [https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt](EFF wordlist), it should be able to load it.
It assumes the wordlist uses 5 regular dices, resulting in 7776 words.

| Param  | Type   | Description                                                | Default |
| --- | --- | --- | --- |
| wordlist  | string | URL or local path of the wordlist used to get the words | N/A |

