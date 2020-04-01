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

    /*public get legkorabbiTanar(): string {
        let elso: Fogadas = this._fogadasok[0];
        //this._fogadasok.forEach(e => (e.etap < elso ? (elso = e.etap) : ""));
        //const nev = elso.teljesNev.toString();
        for (let i = 1; i < this._fogadasok.length; i++) {
            if (this._fogadasok[i].etap < elso.etap) {
                elso = this._fogadasok[i];
            }
        }
        return elso.teljesNev;
    }*/

    public get legkorabbiTanar(): string {
        let keresettHonap = this._fogadasok[0].honap;
        let keresettNap = this._fogadasok[0].nap;
        let keresettNev = this._fogadasok[0].teljesNev;
        let foglaltIdopont = this._fogadasok[0].lefoglaltIdo;
        let foglalasIdeje = this._fogadasok[0].rogzitesIdo;
        for (const fogadas of this._fogadasok) {
            if (fogadas.honap < keresettHonap && fogadas.nap < keresettNap) {
                keresettHonap = fogadas.honap;
                keresettNap = fogadas.nap;
                keresettNev = fogadas.teljesNev;
                foglaltIdopont = fogadas.lefoglaltIdo;
                foglalasIdeje = fogadas.rogzitesIdeje;
            }
        }
        return keresettNev + "\n" + "Foglalt időpont: " + foglaltIdopont + "\n" + "Foglalás ideje: " + foglalasIdeje;
    }

    public Idostring(intervallumId: number): string {
        const ora = (16 * 60 + intervallumId * 10) / 60;
        const perc = (16 * 60 + intervallumId * 10) % 60;
        return ora.toString() + ":" + perc.toString();
    }

    /*public get Szabadsavok(): string {
        const foglalt = Array<boolean>(12);
        let szoveg = "";
        for (let i = 1; i < 12; i++) {
            foglalt[i] = false;
        }
        this._fogadasok.forEach(e => (e.teljesNev == "Barna Eszter" ? foglalt[e.etap] == true : ""));
        for (let i = 1; i < 12; i++) {
            if (foglalt[i] == false) {
                szoveg += this._fogadasok[i].lefoglaltIdo.toString() + "\n";
            }
        }

        return szoveg;
    }*/
    public get Szabadsavok(): string {
        const seged: string[] = ["16:00", "16:10", "16:20", "16:30", "16:40", "16:50", "17:00", "17:10", "17:20", "17:30", "17:40", "17:50"];
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
}
