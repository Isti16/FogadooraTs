import fs from "fs";
import http from "http";
import url from "url";
import Fogadas from "./Fogadas";
import Megoldas from "./Megoldas";

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

        //2.
        res.write("2. feladat\n");
        res.write(`Foglalások száma: ${megold.bejegyzesekSzama} \n`);

        //3.
        const u = url.parse(req.url as string, true).query;
        const bekertTanar: string = u.fordulo as string;
        //if (bekertTanar == "") bekertTanar = "";
        res.write("3. feladat\n");
        res.write(`Adjon meg egy nevet: <input type='text' name='beker' value=${bekertTanar} style='width: 3em'>\n`);
        if (megold.idopontSzam(bekertTanar) == 0) {
            res.write(`${bekertTanar} néven nincs időpont.`);
        } else {
            res.write(`${bekertTanar} néven ${megold.idopontSzam(bekertTanar)} időpont van.`);
        }

        //4.

        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
