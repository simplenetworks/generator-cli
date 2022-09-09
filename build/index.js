#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const options = (0, yargs_1.default)(process.argv.slice(2))
    .options({
    m: { alias: 'model', describe: "The model file name", type: "string", demandOption: true }
}).parseSync();
const model = options.model;
console.log(model);
