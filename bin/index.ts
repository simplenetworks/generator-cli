#!/usr/bin/env node
import yargs, { boolean } from "yargs";
import { config } from "./config";
import { spawnSync } from "child_process";
import { exit } from "process";

const options = yargs(process.argv.slice(2))
    .options({
        e: { alias: 'entity', describe: "The entity name", type: "string", demandOption: true },
        i: { alias: 'install', describe: "Install the dependencies", type: "boolean" },
        c: { alias: 'component', describe: "Run component schematics", type: "boolean" },
        l: { alias: 'laravel-service', describe: "Run laravel-service schematics", type: "boolean" },
        s: { alias: 'store', describe: "Run store schematics", type: "boolean" },
        m: { alias: 'model', describe: "Run model schematics", type: "boolean" },
        a: { alias: 'all', describe: "Run all schematics", type: "boolean" }
    }).parseSync();

const c = config.config;

if (options.i) {
    spawnSync('ng', ['add', '@simplenetworks/simple-schematics'], { stdio: 'inherit' });
    exit()
}

if (options.c || options.a) {
    spawnSync('schematics', ['@simplenetworks/simple-schematics:component', '--project', c.project, '--name', options.e, '--model-path', c.folders.model, '--path', c.folders.component], { stdio: 'inherit' });
}

if (options.l || options.a) {
    spawnSync('schematics', ['@simplenetworks/simple-schematics:laravel-service', '--project', c.project, '--name', options.e, '--model-path', c.folders.model, '--path', c.folders.laravel_service], { stdio: 'inherit' });
}

if (options.s || options.a) {
    spawnSync('schematics', ['@simplenetworks/simple-schematics:store', '--project', c.project, '--name', options.e, '--path', c.folders.store], { stdio: 'inherit' });
}

if (options.m || options.a) {
    spawnSync('schematics', ['@simplenetworks/simple-schematics:model', '--project', c.project, '--name', options.e, '--model-path', c.folders.model, '--path', c.folders.model], { stdio: 'inherit' });
}
