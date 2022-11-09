### Ccxt With Rest Api Type
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
 * @type {import('ccxt-with-rest-api-type').binanceRestApiType}
 */
const binance = new ccxt.binance();

(async () => {
    const ExchangeInfo = await binance.v1PublicGetFutures();
    console.log(ExchangeInfo)
})()
```
