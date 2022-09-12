#!/usr/bin/env node
import yargs from "yargs";
import { config } from "./config";
import { ActionGenerator } from "./generators/action";
import { ModelGenerator } from "./generators/model";

const options = yargs(process.argv.slice(2))
    .options({
        e: { alias: 'entity', describe: "The entity name", type: "string", demandOption: true }
    }).parseSync();

const entity = options.e;

const model = new ModelGenerator(entity, config.config);
model.run();

const actions = new ActionGenerator(entity, config.config);
actions.run();