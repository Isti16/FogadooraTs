import fs from "fs";
import http from "http";
import url from "url";
import Megoldas from "./Megoldas";
import { isUndefined } from "util";

interface InputInterface {
    name: string;
    age: number;
    male: boolean;
}
export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }

        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Fogadóóra Érettségi feladat</title>");
        res.write("</head>");
        res.write("<body><form><pre>");

        // Kezd a kódolást innen -->

        const megold: Megoldas = new Megoldas("fogado.txt");

        //2. Írja a képernyőre, hogy hány foglalás adatait tartalmazza a fájl!
        res.write("2. feladat\n");
        res.write(`Foglalások száma: ${megold.bejegyzesekSzama} \n\n`);

        //3.Kérje be a felhasználótól egy tanár nevét, majd jelenítse meg a mintának megfelelően a képernyőn,
        //hogy a megadott tanárnak hány időpontfoglalása van!
        //Ha a megadott tanárhoz – ilyen például Farkas Attila – még nem történt foglalás,
        //akkor „A megadott néven nincs időpontfoglalás.” üzenetet jelenítse meg!
        const u = url.parse(req.url as string, true).query;
        let bekertTanarNev: string = u.bekertnev as string;
        if (isUndefined(bekertTanarNev) || bekertTanarNev === "") {
            bekertTanarNev = "Nagy Ferenc";
        }
        res.write("3. feladat\n");
        res.write(`Adjon meg egy nevet: <input type='text' name='bekertnev' value='${bekertTanarNev.trim()}' style='width: 12em' onChange='this.form.submit();' >\n`);
        if (megold.idopontSzam(bekertTanarNev.trim()) == 0) {
            res.write(`${bekertTanarNev.trim()} néven nincs időpont.\n\n`);
        } else {
            res.write(`${bekertTanarNev.trim()} néven ${megold.idopontSzam(bekertTanarNev.trim())} időpontfoglalás van.\n\n`);
        }

        //4. Kérjen be a felhasználótól egy érvényes időpontot a forrásfájlban található formátumban (pl. 17:40)!
        // A program írja a képernyőre a megadott időpontban foglalt tanárok névsorát! Egy sorban egy név szerepeljen!
        //A névsor ábécé szerint rendezett legyen! A rendezett névsort írja ki fájlba is, és ott is soronként egy név szerepeljen!
        //Az időpontnak megfelelő fájlnevet használjon, például 17:40 esetén a 1740.txt fájlban tárolja el az adatokat!
        //Ügyeljen arra, hogy a fájlnév a kettőspont karaktert ne tartalmazza!
        //(Amennyiben ezen a néven nem tudja a fájlt létrehozni, használja az adatok.txt állománynevet!)
        res.write("4. feladat\n");
        let bekertIdopont: string = u.beker_idopont as string;
        if (isUndefined(bekertIdopont) || bekertIdopont === "") {
            bekertIdopont = "17:40";
        }
        res.write(`Adjon meg egy érvényes időpontot (pl. 17:10): <input type='text' name='beker_idopont' value=${bekertIdopont.trim()} style='width: 3em' onChange='this.form.submit();' >\n\n`);
        res.write(`${megold.foglaltTanarok(bekertIdopont.trim())}`);
        megold.allomanybaIr(bekertIdopont.replace(":", "").toString() + ".txt", megold.irasSeged(bekertIdopont.trim()));
        //5. Határozza meg, majd írja ki a képernyőre a legkorábban lefoglalt időpont minden adatát!
        //Az adatok megjelenítésénél pontosan kövesse a feladat végén szereplő mintát!

        res.write("\n5. feladat\n");
        const legelso = megold.Legelso();
        res.write(`Tanár neve: ${legelso.teljesNev}\n`);
        res.write(`Foglalt időpont: ${legelso.lefoglaltIdo}\n`);
        res.write(`Foglalás ideje: ${legelso.rogzitesIdo}\n`);

        //6. Írja ki a képernyőre „Barna Eszter” tanárnő szabad időpontjait!
        //Tudjuk, hogy a tanárnőnek legalább egy foglalt és több szabad időpontja is van.
        //A tanárnő a legutolsó szülő fogadása után távozhat az iskolából.
        //Mikor távozhat legkorábban? Az időpontot azonosíthatóan írja ki a képernyőre!

        res.write("\n6. feladat\n");
        res.write(`${megold.Szabadsavok}`);
        res.write(`Barna Eszter legkorábban távozhat: ${megold.TavozasOra}\n`);

        res.write("\n<h3><a href='https://github.com/Isti16/FogadooraTs.git'>Github repository</a></h3>\n\n");

        res.write(bekertIdopont.replace(":", "").toString() + ".txt kiírása:\n\n");

        fs.readFileSync(bekertIdopont.replace(":", "").toString() + ".txt")
            .toString()
            .split("\r\n")
            .forEach(l => {
                res.write(l + "\n");
            });

        res.write("A fogado.txt kiírása:\n\n");

        fs.readFileSync("fogado.txt")
            .toString()
            .split("\r\n")
            .forEach(l => {
                res.write(l + "\n");
            });

        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
