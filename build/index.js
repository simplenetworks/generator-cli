#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const config_1 = require("./config");
const options = (0, yargs_1.default)(process.argv.slice(2))
    .options({
    m: { alias: 'model', describe: "The model file name", type: "string", demandOption: true }
}).parseSync();
console.log(options);
const model = options.model;
const config = new config_1.Config().config;
console.log(config);
