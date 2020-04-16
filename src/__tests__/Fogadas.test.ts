import Fogadas from "../Fogadas";

describe("Fizetés osztály unit tesztjei", () => {
    const instance: Fogadas = new Fogadas("Csorba Ede 16:30 2017.10.28-18:48");

    it("Fizetes osztály típusa", async () => {
        expect(instance).toBeInstanceOf(Fogadas);
    });

    it("Teljes név", async () => {
        expect(instance.teljesNev).toBe("Csorba Ede");
    });

    it("Lefoglalt idő", async () => {
        expect(instance.lefoglaltIdo).toBe("16:30");
    });

    it("Rögzítés ideje", async () => {
        expect(instance.rogzitesIdo).toBe("2017.10.28-18:48");
    });
});
