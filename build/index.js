#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const config_1 = require("./config");
const child_process_1 = require("child_process");
const process_1 = require("process");
const options = (0, yargs_1.default)(process.argv.slice(2))
    .options({
    e: { alias: 'entity', describe: "The entity name", type: "string", demandOption: true },
    i: { alias: 'install', describe: "Install the dependencies", type: "boolean" },
    c: { alias: 'component', describe: "Run component schematics", type: "boolean" },
    l: { alias: 'laravel-service', describe: "Run laravel-service schematics", type: "boolean" },
    s: { alias: 'store', describe: "Run store schematics", type: "boolean" },
    m: { alias: 'model', describe: "Run model schematics", type: "boolean" },
    a: { alias: 'all', describe: "Run all schematics", type: "boolean" }
}).parseSync();
const c = config_1.config.config;
if (options.i) {
    (0, child_process_1.spawnSync)('ng', ['add', '@simplenetworks/simple-schematics'], { stdio: 'inherit' });
    (0, process_1.exit)();
}
if (options.c || options.a) {
    (0, child_process_1.spawnSync)('schematics', ['@simplenetworks/simple-schematics:component', '--project', c.project, '--name', options.e, '--model-path', c.folders.model, '--path', c.folders.component], { stdio: 'inherit' });
}
if (options.l || options.a) {
    (0, child_process_1.spawnSync)('schematics', ['@simplenetworks/simple-schematics:laravel-service', '--project', c.project, '--name', options.e, '--model-path', c.folders.model, '--path', c.folders.laravel_service], { stdio: 'inherit' });
}
if (options.s || options.a) {
    (0, child_process_1.spawnSync)('schematics', ['@simplenetworks/simple-schematics:store', '--project', c.project, '--name', options.e, '--path', c.folders.store], { stdio: 'inherit' });
}
if (options.m || options.a) {
    (0, child_process_1.spawnSync)('schematics', ['@simplenetworks/simple-schematics:model', '--project', c.project, '--name', options.e, '--model-path', c.folders.model, '--path', c.folders.model], { stdio: 'inherit' });
}
