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
exports.__esModule = true;
var CallAPI_1 = require("./CallAPI");
var Extensions_1 = require("./Extensions");
var readline_1 = require("readline");
var Index = /** @class */ (function () {
    function Index() {
        var _this = this;
        this.readline = readline_1.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.getQueryPath = function () { return "$." + _this.currPair + "." + _this.keyColumn; };
        this.getPrice = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this.startDateTime = new Date();
                        _b = (_a = Extensions_1.PriceTracker.Extensions).logMessages;
                        _c = "Response at " + this.startDateTime + " is: ";
                        return [4 /*yield*/, this.callAPI.getPriceFromAPIAsync(this.queryPath)];
                    case 1:
                        _b.apply(_a, [_c + (_e.sent()) + " ", null]);
                        _d = setTimeout;
                        return [4 /*yield*/, this.getPrice];
                    case 2:
                        _d.apply(void 0, [_e.sent(), Extensions_1.PriceTracker.scheduleInterval]);
                        return [2 /*return*/];
                }
            });
        }); };
        this.questionRecursive = function (n) {
            if (n < Extensions_1.PriceTracker.questions.length) {
                _this.readline.question(Extensions_1.PriceTracker.questions[n], function (answer) {
                    if (n === 0) {
                        _this.currPair = answer;
                    }
                    else if (n === 1) {
                        _this.queryPath = answer;
                    }
                    _this.readline.close();
                    _this.questionRecursive(n + 1);
                });
            }
        };
        this.callAPI = new CallAPI_1.CallAPI();
        this.startDateTime = new Date();
        this.currPair = Extensions_1.PriceTracker.currPair;
        this.keyColumn = Extensions_1.PriceTracker.keyColumn;
        this.queryPath = this.getQueryPath();
    }
    Index.prototype.main = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //Extensions.logMessages(`Hello there`, null);
                this.questionRecursive(0);
                this.getPrice();
                return [2 /*return*/];
            });
        });
    };
    return Index;
}());
exports.Index = Index;
var index = new Index();
index.main();
