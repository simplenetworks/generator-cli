#!/usr/bin/env node

import yargs from "yargs";

const options = yargs(process.argv.slice(2))
    .options({
        m: { alias: 'model', describe: "The model file name", type: "string", demandOption: true }
    }).parseSync();

const model = options.model;
console.log(model);