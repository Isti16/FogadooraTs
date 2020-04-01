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

    public idopontSzam(bekertTanarNev: string): number {
        let szam = 0;
        this._fogadasok.forEach(e => (e.teljesNev == bekertTanarNev ? szam++ : ""));
        return szam;
    }

    /*public foglaltTanarok(idopont: string): string[] {
        const tanarok: string[] = [""];
        this._fogadasok.forEach(e => (e.lefoglaltIdo === idopont ? tanarok.push(e.teljesNev + "\n") : ""));
        return tanarok.sort();
    }*/
    public foglaltTanarok(idopont: string): string {
        const tanarok: string[] = [];
        let seged = "";
        this._fogadasok.forEach(e => (e.lefoglaltIdo === idopont ? tanarok.push(e.teljesNev + "\n") : ""));
        tanarok.sort();
        tanarok.forEach(e => (seged += e));
        return seged;
    }

    public irasSeged(idopont: string): string[] {
        const tanarok: string[] = [];
        this._fogadasok.forEach(e => (e.lefoglaltIdo === idopont ? tanarok.push(e.teljesNev + "\n") : ""));
        return tanarok.sort();
    }

    public allomanybaIr(fajlnev: string, tartalom: string[]): void {
        fs.writeFileSync(fajlnev, tartalom.join(""));
    }

    /*public legkorabbiTanar(): string {
        const talaltNev = "";
        const segedev = new Date(2020, 12, 12);
        for (let i = 1; i < this._fogadasok.length; i++) {
            if (this._fogadasok[i].rogzitesNapja <= segedev) {
            }
        }
        return talaltNev;
    }*/
}
