const { randomInt } = require('crypto')

/**
 * Throws a dice using a cryptographically unsecure random function.
 */
const throwSingleDiceUnsecure = function (): number {
  // Nota: Math.random() NO provee números aleatorios con seguridad criptográfica.
  // No deben ser usados para algo relacionado con seguridad.
  // En vez de eso, usar la API Web Crypto, y más precisamente el método: window.crypto.getRandomValues() (en-US).
  return Math.floor(Math.random()) * 5 + 1
}

/**
 * Throws a dice using a cryptographically secure random function.
 */
const throwSingleDiceSecure = function (): number {
  return randomInt(1, 6)
}

/**
 * Callback function that throws a single dice.
 * @callback throwSingleDice
 */

/**
 * Throws n dices using the selected function
 * @param diceFunction - The function used to throw each dice.
 * @param number - Number of dices thrown.
 */
const throwDices = function (diceFunction: () => number = exports.throwSingleDiceSecure, number = 5): number[] {
  return Array.from(Array(number), () => diceFunction())
}

exports.throwSingleDiceUnsecure = throwSingleDiceUnsecure
exports.throwSingleDiceSecure = throwSingleDiceSecure
exports.throwDices = throwDices
