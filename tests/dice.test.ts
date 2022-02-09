import { throwNDices } from '../src/utils/dice';

describe.each([5, 8, 2])('Dice operations', (n: number) => {

  it('Returns n random numbers between 1 and 6', async () => {
    const defaultDices = await throwNDices(n)
    
    expect(defaultDices).toHaveLength(n)

    defaultDices.forEach((dice: number) => {
      expect(dice).toBeGreaterThanOrEqual(1)
      expect(dice).toBeLessThanOrEqual(6)
      expect(dice % 1).toBe(0)
    })
  })
})
