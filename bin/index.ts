#!/usr/bin/env node
import yargs from "yargs";
import { Config } from "./config";
import { ModelGenerator } from "./generators/model";

const options = yargs(process.argv.slice(2))
    .options({
        e: { alias: 'entity', describe: "The entity name", type: "string", demandOption: true }
    }).parseSync();

const entity = options.e;
const config = new Config().config;

const model = new ModelGenerator(entity, config);
model.save();