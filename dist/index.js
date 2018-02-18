"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fetchPrices_1 = require("./fetchPrices");
var extensions_1 = require("./extensions");
var userInput_1 = require("./userInput");
//"test": "mocha -r ts-node/register src/tests/**/*.ts" 
var Index = /** @class */ (function () {
    //Initialize & define defaults for required values
    function Index() {
        var _this = this;
        this.getQueryPath = function () { return "$." + _this.currPair + "." + _this.keyColumn; };
        this.fetchPrices = new fetchPrices_1.fetchPrices();
        this.currPair = extensions_1.PriceTracker.currPair;
        this.keyColumn = extensions_1.PriceTracker.keyColumn;
        this.scheduleInterval = extensions_1.PriceTracker.scheduleInterval;
        this.queryPath = this.getQueryPath();
    }
    Index.prototype.mainAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        //Set user input preferences
                        _a = this;
                        return [4 /*yield*/, userInput_1.userInput.getUserInputAsync("Please enter currency pair", this.currPair)];
                    case 1:
                        //Set user input preferences
                        _a.currPair = (_f.sent());
                        _b = this;
                        return [4 /*yield*/, userInput_1.userInput.getUserInputAsync("Please enter price key/column to look for in json response from API", this.keyColumn)];
                    case 2:
                        _b.keyColumn = (_f.sent());
                        _c = this;
                        return [4 /*yield*/, userInput_1.userInput.getUserInputAsync("Please enter json query path (like " + this.getQueryPath() + ")", this.getQueryPath())];
                    case 3:
                        _c.queryPath = (_f.sent());
                        _d = this;
                        _e = Number;
                        return [4 /*yield*/, userInput_1.userInput.getUserInputAsync("Please enter interval schedule in ms", this.scheduleInterval.toString())];
                    case 4:
                        _d.scheduleInterval = _e.apply(void 0, [(_f.sent())]);
                        // Start price fetch process
                        this.fetchPrices.pollPriceAsync(this.queryPath, this.scheduleInterval);
                        return [2 /*return*/];
                }
            });
        });
    };
    return Index;
}());
exports.Index = Index;
var index = new Index();
index.mainAsync();
//# sourceMappingURL=index.js.map