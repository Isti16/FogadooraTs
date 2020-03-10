import fs from "fs";
import Fogadas from "./Fogadas";

export default class Megoldás {
    private _fogadasok: Fogadas[] = [];

    constructor(forras: string) {
        fs.readFileSync(forras)
            .toString()
            .split(" ")
            .forEach(i => {
                const adatok = i.trim();
                if (adatok.length > 0) this._fogadasok.push(new Fogadas(adatok));
            });
    }
}
