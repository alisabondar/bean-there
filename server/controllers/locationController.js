"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv.config();
var getCurrent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lat = req.params.lat;
    const long = req.params.long;
    const GOOGLE_API_ENDPOINT = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
    const location = `${lat},${long}`;
    const radius = 5000;
    const keyword = 'coffee';
    const type = 'cafe';
    const apiKey = process.env.GOOGLEAPI_KEY;
    const requestUrl = `${GOOGLE_API_ENDPOINT}?location=${location}&radius=${radius}&keyword=${keyword}&type=${type}&key=${apiKey}`;
    axios_1.default.get(requestUrl)
        .then(result => {
        console.log(result.data.results);
        res.json(result.data.results);
    })
        .catch(err => {
        console.error('Cannot fetch nearby locations', err);
    });
});
var getLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const zipcode = req.params.zipcode;
    axios_1.default.get(`${process.env.GEOCODE_URL}?address=${zipcode}&key=${process.env.GOOGLEAPI_KEY}`)
        .then(result => {
        res.json(result.data.results);
    })
        .catch(err => {
        console.error('Cannot fetch zipcode results', err);
    });
});
module.exports = { getCurrent, getLocations };
