import { Config, REPLACE_POINTS_REGEX, Template, WriteMode } from "../commons/types";
import { formatPath, readFile, writeFile } from "../commons/helpers/file";
import { findRegex, startCase } from "../commons/helpers/string";
import { Replace } from "../commons/types/replace";

export class BaseGenerator {
    entityName: string;
    entityFolder: string;

    templateContent: string;
    templateType: Template;
    templateWriteMode: WriteMode;

    replacePoints: string[] = [];
    replaceFunctions: { [key: string]: Function } = {};

    constructor(entityName: string, templateContent: string, templateType: Template, config: Config, templateWriteMode: WriteMode) {
        this.entityName = entityName;
        this.templateContent = templateContent;
        this.templateType = templateType;

        this.entityFolder = formatPath(config.folders.models);
        this.templateWriteMode = templateWriteMode;

        this.init();
    }

    private replaceTemplate(): void {
        this.templateContent = this.templateContent.replaceAll(Replace.STRING, this.entityName);
        this.templateContent = this.templateContent.replaceAll(Replace.START_CASE_STRING, startCase(this.entityName));
        this.templateContent = this.templateContent.replaceAll(Replace.CAPITAL_STRING, this.entityName.toUpperCase());
    }

    private loadReplacePoints(): void {
        this.replacePoints = findRegex(this.templateContent, REPLACE_POINTS_REGEX);
    }

    private init(): void {
        this.replaceTemplate();
        this.loadReplacePoints();
    }

    /* post init */
    doReplaceFunction(): void {
        for (let point of this.replacePoints) {
            if (!this.replaceFunctions.hasOwnProperty(point)) {
                throw new Error(`Replace function: ${point} not implemented`);
            }

            this.replaceFunctions[point](point);
            this.templateContent = this.templateContent.replaceAll(`$!${point}$!`, '');
        }
    }

    save(): void {
        const path = `${this.entityFolder}/${this.entityName}.${this.templateType}.ts`;
        writeFile(path, this.templateContent);
    }
}