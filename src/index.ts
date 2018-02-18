import { fetchPrices } from "./fetchPrices";
import { PriceTracker } from "./extensions";
import { userInput } from "./userInput";
import extensions = PriceTracker.extensions;

//"test": "mocha -r ts-node/register src/tests/**/*.ts" 
export class Index {

    private fetchPrices: fetchPrices;
    private currPair: string; 
    private keyColumn: string; 
    private queryPath: string;
    private scheduleInterval: number;

    private getQueryPath = () => `$.${this.currPair}.${this.keyColumn}`;

    //Initialize & define defaults for required values
    constructor() {
       this.fetchPrices = new fetchPrices();
       this.currPair = PriceTracker.currPair;
       this.keyColumn = PriceTracker.keyColumn;
       this.scheduleInterval = PriceTracker.scheduleInterval;  
       this.queryPath = this.getQueryPath();
    }

    async mainAsync() {
        //Set user input preferences
        this.currPair = (await userInput.getUserInputAsync(`Please enter currency pair`, this.currPair));
        this.keyColumn = (await userInput.getUserInputAsync(`Please enter price key/column to look for in json response from API`, this.keyColumn));
        this.queryPath = (await userInput.getUserInputAsync(`Please enter json query path (like ${this.getQueryPath()})`, this.getQueryPath()));
        this.scheduleInterval = Number((await userInput.getUserInputAsync(`Please enter interval schedule in ms`, this.scheduleInterval.toString())));
        // Start price fetch process
        this.fetchPrices.pollPriceAsync(this.queryPath,this.scheduleInterval);
    }
}

let index = new Index();
index.mainAsync();