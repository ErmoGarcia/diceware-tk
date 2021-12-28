"use strict";
exports.__esModule = true;
var randomInt = require('crypto').randomInt;
/**
 * Throws a dice using a cryptographically unsecure random function.
 */
var throwSingleDiceUnsecure = function () {
    // Nota: Math.random() NO provee números aleatorios con seguridad criptográfica.
    // No deben ser usados para algo relacionado con seguridad.
    // En vez de eso, usar la API Web Crypto, y más precisamente el método: window.crypto.getRandomValues() (en-US).
    return Math.floor(Math.random()) * 5 + 1;
};
/**
 * Throws a dice using a cryptographically secure random function.
 */
var throwSingleDiceSecure = function () {
    return randomInt(1, 6);
};
/**
 * Callback function that throws a single dice.
 * @callback throwSingleDice
 */
/**
 * Throws n dices using the selected function
 * @param diceFunction - The function used to throw each dice.
 * @param number - Number of dices thrown.
 */
var throwDices = function (diceFunction, number) {
    if (diceFunction === void 0) { diceFunction = exports.throwSingleDiceSecure; }
    if (number === void 0) { number = 5; }
    return Array.from(Array(number), function (x) { return diceFunction(); });
};
exports.throwSingleDiceUnsecure = throwSingleDiceUnsecure;
exports.throwSingleDiceSecure = throwSingleDiceSecure;
exports.throwDices = throwDices;
