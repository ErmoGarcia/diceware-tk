"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playDiceware = void 0;
const playDiceware = (dictionary, dices, passwordLength = 5) => {
    const passphrase = Array(passwordLength).map(() => {
        return dictionary.get(...dices);
    });
    return passphrase;
};
exports.playDiceware = playDiceware;
