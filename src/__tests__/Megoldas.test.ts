import Megoldas from "../Megoldas";

describe("Megoldás osztály unit tesztjei", () => {
    const megoldas: Megoldas = new Megoldas("fogado.txt");

    it("Megoldás osztály típusa", async () => {
        expect(megoldas).toBeInstanceOf(Megoldas);
    });

    it("Foglalások száma", async () => {
        expect(megoldas.bejegyzesekSzama).toBe(161);
    });
});
