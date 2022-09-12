#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const config_1 = require("./config");
const action_1 = require("./generators/action");
const model_1 = require("./generators/model");
const options = (0, yargs_1.default)(process.argv.slice(2))
    .options({
    e: { alias: 'entity', describe: "The entity name", type: "string", demandOption: true }
}).parseSync();
const entity = options.e;
const model = new model_1.ModelGenerator(entity, config_1.config.config);
model.run();
const actions = new action_1.ActionGenerator(entity, config_1.config.config);
actions.run();
