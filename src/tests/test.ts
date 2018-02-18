import { fetchPrices } from './../fetchPrices';
import { PriceTracker } from "./../extensions";
import extensions = PriceTracker.extensions;
import { expect, assert, should } from "chai";
import 'mocha';

describe('should return price from Poloniex API', () => {
    let fhPrices = new fetchPrices();
    const getPrices = (async () => await fhPrices.getPriceFromAPIAsync(`$.BTC_ETH.last`));
    assert.isNotNull(getPrices);
});

describe('should return simple moving average', () => {
    const getSMA = (async () => await extensions.simpleSMAAsync([0.01223, 0.011000, 0.013231]));
    expect(getSMA).is.not.null;
});
