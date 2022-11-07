import ccxt from "ccxt";
import {defineRestApi} from "./utils"
import fs from "node:fs";
import path from "node:path";
const exchanges = ccxt.exchanges
fs.rmSync(path.join(__dirname, "./types"), { recursive: true, force: true });
fs.mkdirSync(path.join(__dirname, "./types"));
(async () => {
    const writeIndexStream = fs.createWriteStream(path.resolve(__dirname, `./import.js`));
    exchanges.forEach(async (exchange, index)=>{
        const writeStream = fs.createWriteStream(path.resolve(__dirname, `./types/${exchange}.d.ts`));
        const exchangeInstance = new ccxt[exchange]();
        const restApi = await defineRestApi(exchangeInstance.api, "request", []);
        writeStream.write(`import {${exchange} as Type} from 'ccxt';\nexport class ${exchange}RestApiType extends Type {\n\t${Object.keys(restApi).map(method => `${method}: (params:{}, context?:{}) => Promise<any>;`).join('\n\t')}\n}`);
        writeStream.end();
        writeIndexStream.write(`export {${exchange}RestApiType} from './types/${exchange}';\n`)
        console.log("exchange", exchange, index+1, ccxt.exchanges.length, Object.keys(restApi).length)
    })
    await new Promise(r => setTimeout(r, 2000));
    writeIndexStream.end();
})()

