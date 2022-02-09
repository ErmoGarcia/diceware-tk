import { getPassphrase } from '../src/index';


describe.each(['src/dictionaries/DW-Espanol-1.txt', 'src/dictionaries/DW-Espanol-2.txt'])('Playing Diceware', (filename) => {

    it('Creating a 5 words passphrase (default)', async () => {
        const passphrase = await getPassphrase()

        expect(passphrase).toHaveLength(5)
    })

    it('Creating a 6 words passphrase', async () => {
        const passphrase = await getPassphrase(6)

        expect(passphrase).toHaveLength(6)
    })
})