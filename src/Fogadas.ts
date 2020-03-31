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

    public get rogzitesNapja(): string {
        return this._rogzitesIdo.split("-")[0];
    }

    public get rogzitesIdeje(): string {
        return this._rogzitesIdo.split("-")[1];
    }

    public get teljesNev(): string {
        return this._vezeteknev + " " + this._utonev;
    }

    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this._vezeteknev = m[0];
        this._utonev = m[1];
        this._lefoglaltIdo = m[2];
        this._rogzitesIdo = m[3];
    }
}
