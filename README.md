### Ccxt With Rest Api Type for NODEJS
````shell
npm install --save-dev ccxt-with-rest-api-type
yarn add -D ccxt-with-rest-api-type
````
Typescript
```typescript
import {binanceRestApiType} from 'ccxt-with-rest-api-type';
import ccxt from "ccxt";

const binance = <binanceRestApiType>new ccxt.binance();

(async ()=>{
    const ExchangeInfo = await binance.fapiPublicGetExchangeInfo()
    console.log(ExchangeInfo)
})()
```

Javascript
```javascript
import ccxt from "ccxt";
/**
 * @type {import('ccxt-with-rest-api-type').wooRestApiType}
 */
const woo = new ccxt.woo();

(async () => {
    const ExchangeInfo = await woo.v1PublicGetFuturesSymbol({
        symbol: 'PERP_BTC_USDT'
    });
    console.log(ExchangeInfo)
})()
```
