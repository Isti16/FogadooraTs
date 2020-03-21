import fs from "fs";
import Fogadas from "./Fogadas";

export default class Megoldás {
    private _fogadasok: Fogadas[] = [];

    public get bejegyzesekSzama(): number {
        return this._fogadasok.length;
    }

    constructor(forras: string) {
        fs.readFileSync(forras)
            .toString()
            .split("\n")
            .forEach(i => {
                const adatok = i.trim();
                if (adatok.length > 0) this._fogadasok.push(new Fogadas(adatok));
            });
    }

    public idopontSzam(bekertTanar: string): number {
        bekertTanar.split(" ");
        let szam: null | number = 0;
        for (const i of this._fogadasok) {
            if (i.vezeteknev == bekertTanar[0] && i.utonev == bekertTanar[1]) {
                szam++;
            }
        }
        return szam;
    }
}
