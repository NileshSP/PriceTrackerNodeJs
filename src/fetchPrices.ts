import Axios from "Axios";
import { parse, query, value } from "jsonpath";
import { Index } from "./index";
import { PriceTracker } from "./extensions";
const ora = require("ora");
import extensions = PriceTracker.extensions;

export class fetchPrices {
    constructor() {
        this.listPrices = new Map<Date, number>();
    }

    private listPrices: Map<Date, number>;

    // poll prices as per (user or default)defined interval
    public pollPriceAsync = async (queryPath: string, pollInterval: number) => {
        try {
            let status = new ora();
            const startPricing = async () => {
                status.stop();
                let startDateTime = new Date();
                let priceNow = await this.getPriceFromAPIAsync(queryPath);
                this.listPrices.set(startDateTime, Number(priceNow));
                extensions.logMessagesAsync(`\r\n${Array.from(this.listPrices.entries()).length}. Price at ${startDateTime} is: ${priceNow} `, null);
                let sma = await extensions.getSMAAsync(Array.from(this.listPrices.values()));
                if(sma.find(s => s.toString().lastIndexOf(`Infinity`) !== -1))
                {
                    sma = [0];
                }
                extensions.logMessagesAsync(`Simple Moving Average : ${sma} `,null);
                status.start();
                setTimeout(await startPricing, pollInterval);
            };
            startPricing();            
        } catch (error) {
            extensions.logMessagesAsync("",error);                
        }
    };
    
    // get prices in json format from polonies API
    async getPriceFromAPIAsync(queryPath: string) {
        let returnPrice;
        try {
            let response = await Axios.get(PriceTracker.getUrl);
            let priceData = await response.data;
            returnPrice = query(priceData, queryPath,1);
        } catch (error) {
            extensions.logMessagesAsync("",error);
        }
        finally{
            return returnPrice;
        }
    }
}