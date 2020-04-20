export default class Fogadas {
    private _teljesNev: string;
    private _lefoglaltIdo: string;
    private _lefoglaltOra: number;
    private _lefoglaltPerc: number;
    private _rogzitesIdo: string;
    private _etap: number;
    private _ora: number;
    private _perc: number;

    public get lefoglaltIdo(): string {
        return this._lefoglaltIdo;
    }

    public get lefoglaltOra(): number {
        return this._lefoglaltOra;
    }

    public get lefoglaltPerc(): number {
        return this._lefoglaltPerc;
    }

    public get rogzitesIdo(): string {
        return this._rogzitesIdo;
    }

    public get teljesNev(): string {
        return this._teljesNev;
    }

    public get etap(): number {
        return this.intervallumId(this._ora, this._perc);
    }

    public intervallumId(ora: number, perc: number): number {
        return ora * 60 + perc;
    }

    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this._teljesNev = m[0] + " " + m[1];
        this._lefoglaltIdo = m[2];
        this._lefoglaltOra = parseInt(m[2].split(":")[0]);
        this._lefoglaltPerc = parseInt(m[2].split(":")[1]);
        this._rogzitesIdo = m[3];
        const seged = m[3].split("-")[1];
        this._ora = parseInt(seged.split(":")[0]);
        this._perc = parseInt(seged.split(":")[1]);
        this._etap = this.intervallumId(this._ora, this._perc);
    }
}
