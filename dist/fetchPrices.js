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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var Axios_1 = __importDefault(require("Axios"));
var jsonpath_1 = require("jsonpath");
var extensions_1 = require("./extensions");
var ora = require("ora");
var extensions = extensions_1.PriceTracker.extensions;
var fetchPrices = /** @class */ (function () {
    function fetchPrices() {
        var _this = this;
        // poll prices as per (user or default)defined interval
        this.pollPriceAsync = function (queryPath, pollInterval) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var status_1, startPricing_1;
            return __generator(this, function (_a) {
                try {
                    status_1 = new ora();
                    startPricing_1 = function () { return __awaiter(_this, void 0, void 0, function () {
                        var startDateTime, priceNow, sma, _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    status_1.stop();
                                    startDateTime = new Date();
                                    return [4 /*yield*/, this.getPriceFromAPIAsync(queryPath)];
                                case 1:
                                    priceNow = _b.sent();
                                    this.listPrices.set(startDateTime, Number(priceNow));
                                    extensions.logMessagesAsync("\r\n" + Array.from(this.listPrices.entries()).length + ". Price at " + startDateTime + " is: " + priceNow + " ", null);
                                    return [4 /*yield*/, extensions.getSMAAsync(Array.from(this.listPrices.values()))];
                                case 2:
                                    sma = _b.sent();
                                    if (sma.find(function (s) { return s.toString().lastIndexOf("Infinity") !== -1; })) {
                                        sma = [0];
                                    }
                                    extensions.logMessagesAsync("Simple Moving Average : " + sma + " ", null);
                                    status_1.start();
                                    _a = setTimeout;
                                    return [4 /*yield*/, startPricing_1];
                                case 3:
                                    _a.apply(void 0, [_b.sent(), pollInterval]);
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    startPricing_1();
                }
                catch (error) {
                    extensions.logMessagesAsync("", error);
                }
                return [2 /*return*/];
            });
        }); };
        this.listPrices = new Map();
    }
    // get prices in json format from polonies API
    fetchPrices.prototype.getPriceFromAPIAsync = function (queryPath) {
        return __awaiter(this, void 0, void 0, function () {
            var returnPrice, response, priceData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        return [4 /*yield*/, Axios_1.default.get(extensions_1.PriceTracker.getUrl)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.data];
                    case 2:
                        priceData = _a.sent();
                        returnPrice = jsonpath_1.query(priceData, queryPath, 1);
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        extensions.logMessagesAsync("", error_1);
                        return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, returnPrice];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return fetchPrices;
}());
exports.fetchPrices = fetchPrices;
//# sourceMappingURL=fetchPrices.js.map