import ccxt from "ccxt";
import {defineRestApi} from "./utils"
import fs from "node:fs";
import path from "node:path";
const exchanges = ccxt.exchanges
fs.rmSync(path.join(__dirname, "./types"), { recursive: true, force: true });
fs.mkdirSync(path.join(__dirname, "./types"));
exchanges.forEach(async (exchange, index)=>{
    const writeStream = fs.createWriteStream(path.resolve(__dirname, `./types/${exchange}.d.ts`));
    const exchangeInstance = new ccxt[exchange]();
    const restApi = await defineRestApi(exchangeInstance.api, "request", []);
    writeStream.write(`import {${exchange} as Type} from 'ccxt';\ndeclare class ${exchange}RestApiType extends Type {\n\t${Object.keys(restApi).map(method => `${method}: (params:{}, context?:{}) => Promise<any>;`).join('\n\t')}\n}`);
    writeStream.end();
    console.log("exchange", exchange, index+1, ccxt.exchanges.length, Object.keys(restApi).length)
})
