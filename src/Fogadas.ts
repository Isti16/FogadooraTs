export default class Fogadas {
    private _vezeteknev: string;
    private _utonev: string;
    private _lefoglaltIdo: string;
    private _rogzitesIdo: string;

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

    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this._vezeteknev = m[0];
        this._utonev = m[1];
        this._lefoglaltIdo = m[2];
        this._rogzitesIdo = m[3];
    }
}
