import ccxt from "ccxt";
import {defineRestApi} from "./utils"
import fs from "node:fs";
import path from "node:path";


const exchanges = ccxt.exchanges;


var writeStream = fs.createWriteStream(path.resolve(__dirname, "type.d.ts"));

writeStream.write(`
import {Exchange} from 'ccxt';
`);


for (const exchange of exchanges) {
    const exchangeInstance = new ccxt[exchange]();
    const restApi = defineRestApi(exchangeInstance);
    writeStream.write(`export class ${exchange} extends Exchange {
${Object.keys(restApi).map(method => `${method}(params:{}, context:{}):Promise<any>;`).join('   \n')}
}`);
}
writeStream.end();