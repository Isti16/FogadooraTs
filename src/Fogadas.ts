export default class Fogadas {
    private _vezeteknev: string;
    private _utonev: string;
    private _lefoglaltIdo: string;
    private _rogzitesIdo: string;
    private _etap: number;
    private _ora: number;
    private _perc: number;
    private _honap: number;
    private _nap: number;

    public get vezeteknev(): string {
        return this._vezeteknev;
    }

    public get utonev(): string {
        return this._utonev;
    }

    public get lefoglaltIdo(): string {
        return this._lefoglaltIdo;
    }

    public get rogzitesIdo(): string {
        return this._rogzitesIdo;
    }

    public get rogzitesNapja(): string {
        return this._rogzitesIdo.split("-")[0].replace(".", "-");
    }

    public get rogzitesIdeje(): string {
        return this._rogzitesIdo.split("-")[1];
    }

    public get teljesNev(): string {
        return this._vezeteknev + " " + this._utonev;
    }

    public get etap(): number {
        return this.intervallumId(this.ora, this.perc);
    }

    public intervallumId(ora: number, perc: number): number {
        return (ora * 60 + perc - 16 * 60) / 10;
    }

    public get ora(): number {
        return this._ora;
    }

    public get perc(): number {
        return this._perc;
    }

    public get honap(): number {
        return this._honap;
    }

    public get nap(): number {
        return this._nap;
    }

    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this._vezeteknev = m[0];
        this._utonev = m[1];
        this._lefoglaltIdo = m[2];
        this._rogzitesIdo = m[3];
        const seged = m[3].split("-")[1];
        const segedmasik = m[3].split("-")[0];
        const ora = parseInt(seged.split(":")[0]);
        this._ora = ora;
        const perc = parseInt(seged.split(":")[1]);
        this._perc = perc;
        this._honap = parseInt(segedmasik.split(".")[1]);
        this._nap = parseInt(segedmasik.split(".")[2]);
        this._etap = this.intervallumId(ora, perc);
    }
}
