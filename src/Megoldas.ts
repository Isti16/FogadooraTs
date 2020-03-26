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
        const teljesNev = bekertTanar.split(" ");
        let szam = 0;
        this._fogadasok.forEach(e => (e.vezeteknev == teljesNev[0] && e.vezeteknev == teljesNev[1] ? "" : szam++));
        return szam;
    }

    public legkorabbiTanar(): string {
        let talaltNev = "";
        this._fogadasok.forEach(e => (parseInt(e.rogzitesNapja.split(".")[0]) <= 2017 || parseInt(e.rogzitesNapja.split(".")[1]) <= 12 || parseInt(e.rogzitesNapja.split(".")[2]) <= 31 ? "" : (talaltNev = e.teljesNev)));
        return talaltNev;
    }
}
