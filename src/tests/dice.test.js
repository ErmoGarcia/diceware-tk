"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dice_1 = require("../utils/dice");
describe('Dice operations', () => {
    const defaultDices = (0, dice_1.throwDices)();
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
    const dices = (0, dice_1.throwDices)(dice_1.throwSingleDiceUnsecure, 4);
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
