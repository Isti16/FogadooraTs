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

    public Legelso(): Fogadas {
        let elso = this._fogadasok[0];
        const elsoRogzites = this._fogadasok[0].rogzitesIdo;
        this._fogadasok.forEach(e => (elso.etap < e.etap && e.rogzitesIdo == elsoRogzites ? (elso = e) : ""));
        return elso;
    }

    public get Szabadsavok(): string {
        const seged: string[] = [];
        for (let i = 0; i < this._fogadasok.length; i++) {
            if (!seged.includes(this._fogadasok[i].lefoglaltIdo)) {
                seged.push(this._fogadasok[i].lefoglaltIdo);
            }
        }
        seged.sort();
        let szoveg = "";
        for (let i = 1; i < this._fogadasok.length; i++) {
            for (let j = 1; j < seged.length; j++) {
                if (seged[j] == this._fogadasok[i].lefoglaltIdo && this._fogadasok[i].teljesNev == "Barna Eszter") {
                    seged.splice(j, 1);
                }
            }
        }
        for (const elem of seged) {
            szoveg += elem + "\n";
        }

        return szoveg;
    }

    public get TavozasOra(): string {
        let talaltOra = 0;
        let szam = 0;
        let oraSeged = 0;
        let percSeged = 0;
        for (let i = 1; i < this._fogadasok.length; i++) {
            if (this._fogadasok[i].teljesNev == "Barna Eszter" && (this._fogadasok[i].lefoglaltOra > oraSeged || this._fogadasok[i].lefoglaltPerc > percSeged)) {
                szam = i;
                oraSeged = this._fogadasok[i].lefoglaltOra;
                percSeged = this._fogadasok[i].lefoglaltPerc;
            }
        }
        if (this._fogadasok[szam].lefoglaltPerc) {
            talaltOra = this._fogadasok[szam].lefoglaltPerc + 10;
            return this._fogadasok[szam].lefoglaltOra + ":" + talaltOra.toString();
        } else {
            talaltOra = this._fogadasok[szam].lefoglaltOra + 1;
            return talaltOra + ":00";
        }
    }
}
