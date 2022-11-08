### Ccxt With Rest Api Type
````shell
npm install --save-dev ccxt-with-rest-api-type
yarn add -D ccxt
````

```typescript
import {binanceRestApiType} from 'ccxt-with-rest-api-type';
import ccxt from "ccxt";

const binance = <binanceRestApiType>new ccxt.binance();

(async ()=>{
    const ExchangeInfo = await binance.fapiPublicGetExchangeInfo()
    console.log(ExchangeInfo)
})()
```