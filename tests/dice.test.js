"use strict";
const { throwSingleDiceUnsecure, throwDices } = require('../utils/dice');
describe('Dice operations', () => {
    const defaultDices = throwDices();
    it('length is 5 by default', () => {
        expect(defaultDices).toHaveLength(5);
    });
    it('each dice thrown gives a round number between 1 and 6 (secure by default)', () => {
        defaultDices.forEach((dice) => {
            expect(dice).toBeGreaterThanOrEqual(1);
            expect(dice).toBeLessThanOrEqual(6);
            expect(dice % 1).toBe(0);
        });
    });
    const dices = throwDices(throwSingleDiceUnsecure, 4);
    it('length is wathever was passed to the function', () => {
        expect(dices).toHaveLength(4);
    });
    it('each dice thrown gives a round number between 1 and 6 (unsecure)', () => {
        dices.forEach((dice) => {
            expect(dice).toBeGreaterThanOrEqual(1);
            expect(dice).toBeLessThanOrEqual(6);
            expect(dice % 1).toBe(0);
        });
    });
});
