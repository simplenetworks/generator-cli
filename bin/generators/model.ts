import { Config, Template, WriteMode } from "../commons/types";
import { BaseGenerator } from "./base";

export class ModelGenerator extends BaseGenerator {
    replaceFunctions = {
        'constructor': this.replaceConstructor,
        'toDTO': this.replaceToDTO,
        'fromFormGroup': this.replaceFromFormGroup,
    };

    constructor(modelName: string, config: Config) {
        super(modelName, config, Template.MODEL, WriteMode.APPEND);
    }

    replaceConstructor(point: string): void {
        // TODO: implement logic to create model constructor
    }

    replaceToDTO(point: string): void {
        // TODO: implement logic to create model toDTO function
    }

    replaceFromFormGroup(point: string): void {
        // TODO: implement logic to create model fromFormGroup function
    }

    run() {
        this.doReplaceFunction();
        this.save();
    }
}