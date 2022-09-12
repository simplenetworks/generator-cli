import { Config, Template, WriteMode } from "../commons/types";
import { BaseGenerator } from "./base";
import template from "../templates/model";

export class ModelGenerator extends BaseGenerator {
    replaceFunctions = {
        'DTO': this.replaceDTO,
        'constructor': this.replaceConstructor,
        'toDTO': this.replaceToDTO,
        'fromFormGroup': this.replaceFromFormGroup,
    };

    constructor(modelName: string, config: Config) {
        super(modelName, template, Template.MODEL, config, WriteMode.APPEND);
    }

    replaceDTO(point: string): void {
        // TODO: implement logic to create model DTO
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