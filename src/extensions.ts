export namespace PriceTracker {

   export const getUrl:string = "https://poloniex.com/public?command=returnTicker"; 
   export const scheduleInterval:number = 30000;
   export const currPair = "BTC_ETH";
   export const keyColumn = "last";
   export const questions = [`What currency pair would like to get price for ? `, `What's the query path to look for price in API result ? `];
export abstract class extensions {
        public static logMessagesAsync = async(msg: string, ex: Error | null) => {
            if(ex!=null) {
                console.error(`Error : ${ex}`);
            }
            else {
                console.log(`${await msg}`);
            }
        };

        public static simpleSMAAsync = async (lstPrices: Array<number>) => {
            return lstPrices.map(
              function(el,index, _arr) { 
                  return _arr.filter(
                  function(x2,i2) { 
                    return i2 <= index && i2 > index - lstPrices.length;
                    })
                  .reduce(
                  function(current, last, index, arr){ 
                    return (current + last); 
                    })/index || 1;
                  }).slice(lstPrices.length-1); 
            };
    }
}
