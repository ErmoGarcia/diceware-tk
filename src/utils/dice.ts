// import { randomNumber } from 'random-number-csprng';


/**
 * Throws a dice using a cryptographically secure random function.
 * Function from https://github.com/EFForg/OpenWireless/blob/master/app/js/diceware.js
 */
export const throwSingleDice = (min: number, max: number): number => {
  var rval = 0;
  var range = max - min;
  
  var bits_needed = Math.ceil(Math.log2(range));
  if (bits_needed > 53) {
    throw new Error("We cannot generate numbers larger than 53 bits.");
  }
  var bytes_needed = Math.ceil(bits_needed / 8);
  var mask = Math.pow(2, bits_needed) - 1; 
  // 7776 -> (2^13 = 8192) -1 == 8191 or 0x00001111 11111111
  
  // Create byte array and fill with N random numbers
  var byteArray = new Uint8Array(bytes_needed);

  // If running on the browser
  if (window.crypto) {
    window.crypto.getRandomValues(byteArray);
  }
  // If running on node
  else {
  }
  
  var p = (bytes_needed - 1) * 8;
  for(var i = 0; i < bytes_needed; i++ ) {
    rval += byteArray[i] * Math.pow(2, p);
    p -= 8;   
  }
  
  // Use & to apply the mask and reduce the number of recursive lookups
  rval = rval & mask;
  
  if (rval >= range) {
    // Integer out of acceptable range
    return throwSingleDice(min, max);
  }
  // Return an integer that falls within the range
  return min + rval;
}

// /**
//  * Throws a dice using a cryptographically unsecure random function.
//  */
// export const throwSingleDiceUnsecure = function (): number {
//   // Nota: Math.random() NO provee números aleatorios con seguridad criptográfica.
//   // No deben ser usados para algo relacionado con seguridad.
//   // En vez de eso, usar la API Web Crypto, y más precisamente el método: window.crypto.getRandomValues() (en-US).
//   return Math.floor(Math.random()) * 5 + 1
// }

// /**
//  * Throws a dice using a cryptographically secure random function.
//  */
// export const throwSingleDiceSecure = function (): number {
//   return randomNumber(1, 6)
// }

/**
 * Callback function that throws a single dice.
 * @callback throwSingleDice
 */

/**
 * Throws n dices using the selected function
 * @param diceFunction - The function used to throw each dice.
 * @param number - Number of dices thrown.
 */
export const throwNDices = function (diceFunction: (min: number, max: number) => number = throwSingleDice, number = 5): number[] {
  return Array.from(Array(number), () => diceFunction(1, 6))
}
