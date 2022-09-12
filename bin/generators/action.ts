import { Config, Template, WriteMode } from "../commons/types";
import { BaseGenerator } from "./base";
import actions from "../templates/actions";

export class ActionGenerator extends BaseGenerator {
    constructor(modelName: string, config: Config) {
        super(modelName, actions, Template.ACTION, config, WriteMode.WRITE);
    }

    run() {
        this.doReplaceFunction();
        this.save();
    }
}