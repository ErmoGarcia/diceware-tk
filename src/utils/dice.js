"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwDices = exports.throwSingleDiceSecure = exports.throwSingleDiceUnsecure = void 0;
const crypto_1 = require("crypto");
/**
 * Throws a dice using a cryptographically unsecure random function.
 */
const throwSingleDiceUnsecure = function () {
    // Nota: Math.random() NO provee números aleatorios con seguridad criptográfica.
    // No deben ser usados para algo relacionado con seguridad.
    // En vez de eso, usar la API Web Crypto, y más precisamente el método: window.crypto.getRandomValues() (en-US).
    return Math.floor(Math.random()) * 5 + 1;
};
exports.throwSingleDiceUnsecure = throwSingleDiceUnsecure;
/**
 * Throws a dice using a cryptographically secure random function.
 */
const throwSingleDiceSecure = function () {
    return (0, crypto_1.randomInt)(1, 6);
};
exports.throwSingleDiceSecure = throwSingleDiceSecure;
/**
 * Callback function that throws a single dice.
 * @callback throwSingleDice
 */
/**
 * Throws n dices using the selected function
 * @param diceFunction - The function used to throw each dice.
 * @param number - Number of dices thrown.
 */
const throwDices = function (diceFunction = exports.throwSingleDiceSecure, number = 5) {
    return Array.from(Array(number), () => diceFunction());
};
exports.throwDices = throwDices;
