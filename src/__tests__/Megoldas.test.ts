import Megoldas from "../Megoldas";

describe("Megoldás osztály unit tesztek", () => {
    const megoldas: Megoldas = new Megoldas("fogado.txt");

    it("Megoldás osztálypéldány ellenőrzése", async () => {
        expect(megoldas).toBeInstanceOf(Megoldas);
    });

    it("Foglalások száma", async () => {
        expect(megoldas.bejegyzesekSzama).toBe(161);
    });

    it("Szabadsávok", async () => {
        expect(megoldas.Szabadsavok).toBe("16:00\n16:10\n17:00\n17:40\n17:50\n");
    });

    it("Szabadon távozhat", async () => {
        expect(megoldas.TavozasOra).toBe("17:40");
    });
});
