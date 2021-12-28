const { throwSingleDiceUnsecure, throwSingleDiceSecure, throwDices } = require('../utils/dice')

describe('Dice operations', () => {
  const default_dices = throwDices()
  
  it('length is 5 by default', () => {
    expect(default_dices.length).toBe(5)
  })

  it('each dice thrown gives a round number between 1 and 6 (secure by default)', () => {
    default_dices.forEach((dice) => {
      expect(dice).toBeGreaterThanOrEqual(1)
      expect(dice).toBeLessThanOrEqual(6)
      expect(dice % 1).toBe(0)
    })
  })

  const dices = throwDices(throwSingleDiceUnsecure, 4)
  
  it('length is wathever was passed to the function', () => {
    expect(dices.length).toBe(4)
  })

  it('each dice thrown gives a round number between 1 and 6 (unsecure)', () => {
    dices.forEach((dice) => {
      expect(dice).toBeGreaterThanOrEqual(1)
      expect(dice).toBeLessThanOrEqual(6)
      expect(dice % 1).toBe(0)
    })
  })
})
