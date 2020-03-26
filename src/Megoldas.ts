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

    /*public idopontSzam(bekertTanar: string): number {
        let szam = 0;
        this._fogadasok.forEach(e => (e.vezeteknev == bekertTanar[0] && e.vezeteknev == bekertTanar[1] ? "" : szam++));
        return szam;
    }*/
}
