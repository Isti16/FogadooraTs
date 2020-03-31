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

    public idopontSzam(bekertTanarVezeteknev: string, bekertTanarUtonev: string): number {
        let szam = 0;
        this._fogadasok.forEach(e => (e.vezeteknev == bekertTanarVezeteknev && e.utonev == bekertTanarUtonev ? szam++ : ""));
        return szam;
    }

    /*public foglaltTanarok(idopont: string): string[] {
        const tanarok: string[] = [""];
        this._fogadasok.forEach(e => (e.lefoglaltIdo === idopont ? tanarok.push(e.teljesNev + "\n") : ""));
        return tanarok.sort();
    }*/
    public foglaltTanarok(idopont: string): string {
        const tanarok: string[] = [""];
        let seged = "";
        this._fogadasok.forEach(e => (e.lefoglaltIdo === idopont ? tanarok.push(e.teljesNev + "\n") : ""));
        tanarok.sort();
        tanarok.forEach(e => (seged += e));
        return seged;
    }

    public legkorabbiTanar(): string {
        let talaltNev = "";
        this._fogadasok.forEach(e => (parseInt(e.rogzitesNapja.split(".")[0]) <= 2017 || parseInt(e.rogzitesNapja.split(".")[1]) <= 12 || parseInt(e.rogzitesNapja.split(".")[2]) <= 31 ? "" : (talaltNev = e.teljesNev)));
        return talaltNev;
    }
}
