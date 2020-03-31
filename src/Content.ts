import fs from "fs";
import http from "http";
import url from "url";
import Megoldas from "./Megoldas";
import { isUndefined, isNull } from "util";

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
        res.write("<title>Jedlik Ts Template</title>");
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
        let bekertTanarVezeteknev: string = u.beker_vezeteknev as string;
        let bekertTanarUtonev: string = u.beker_vezeteknev as string;
        if (isUndefined(bekertTanarVezeteknev) || isNull(bekertTanarUtonev) || bekertTanarVezeteknev === "") {
            bekertTanarVezeteknev = "Nagy";
        }
        if (isUndefined(bekertTanarUtonev) || bekertTanarUtonev === "") {
            bekertTanarUtonev = "Ferenc";
        }
        res.write("3. feladat\n");
        res.write(`Adjon meg egy vezetéknevet: <input type='text' name='beker_vezeteknev' value=${bekertTanarVezeteknev} style='width: 12em' >\n\n`);
        res.write(`Adjon meg egy utónevet: <input type='text' name='beker_utonev' value=${bekertTanarUtonev} style='width: 12em' >\n\n`);
        if (megold.idopontSzam(bekertTanarVezeteknev, bekertTanarUtonev) == 0) {
            res.write(`${bekertTanarVezeteknev} ${bekertTanarUtonev} néven nincs időpont.\n\n`);
        } else {
            res.write(`${bekertTanarVezeteknev} ${bekertTanarUtonev} néven ${megold.idopontSzam(bekertTanarVezeteknev, bekertTanarUtonev)} időpontfoglalás van.\n\n`);
        }

        //4. Kérjen be a felhasználótól egy érvényes időpontot a forrásfájlban található formátumban (pl. 17:40)!
        // A program írja a képernyőre a megadott időpontban foglalt tanárok névsorát! Egy sorban egy név szerepeljen!
        //A névsor ábécé szerint rendezett legyen! A rendezett névsort írja ki fájlba is, és ott is soronként egy név szerepeljen!
        //Az időpontnak megfelelő fájlnevet használjon, például 17:40 esetén a 1740.txt fájlban tárolja el az adatokat!
        //Ügyeljen arra, hogy a fájlnév a kettőspont karaktert ne tartalmazza!
        //(Amennyiben ezen a néven nem tudja a fájlt létrehozni, használja az adatok.txt állománynevet!)

        //5. Határozza meg, majd írja ki a képernyőre a legkorábban lefoglalt időpont minden adatát!
        //Az adatok megjelenítésénél pontosan kövesse a feladat végén szereplő mintát!
        res.write(`Tanár neve: ${megold.legkorabbiTanar}\n`);
        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
