import { Config, REPLACE_POINTS_REGEX, Template, WriteMode } from "../commons/types";
import { formatPath, readFile, writeFile } from "../commons/helpers/file";
import { findRegex, startCase } from "../commons/helpers/string";
import { Replace } from "../commons/types/replace";

export class BaseGenerator {
    entityName: string;
    entityFolder: string;

    templateContent: string = "";
    templateType: Template;
    templateWriteMode: WriteMode;

    replacePoints: string[] = [];
    replaceFunctions: { [key: string]: Function } = {};

    constructor(entityName: string, config: Config, templateType: Template, templateWriteMode: WriteMode) {
        this.entityName = entityName;
        this.entityFolder = formatPath(config.folders.models);
        this.templateType = templateType;
        this.templateWriteMode = templateWriteMode;

        this.init();
    }

    private loadTemplate(): void {
        const path = `templates/${this.templateType}.txt`;
        this.templateContent = readFile(path);
    }

    private replaceTemplate(): void {
        this.templateContent = this.templateContent.replace(Replace.STRING, this.entityName);
        this.templateContent = this.templateContent.replace(Replace.START_CASE_STRING, startCase(this.entityName));
        this.templateContent.replace(Replace.CAPITAL_STRING, this.entityName.toUpperCase());
    }

    private loadReplacePoints(): void {
        this.replacePoints = findRegex(this.templateContent, REPLACE_POINTS_REGEX);
    }

    private init(): void {
        this.loadTemplate();
        this.replaceTemplate();
        this.loadReplacePoints();
    }

    /* post init */

    doReplaceFunction(): void {
        for (let point of this.replacePoints) {
            if (!this.replaceFunctions.hasOwnProperty(point)) {
                throw new Error(`Replace function: ${point} not implemented`);
            }

            this.replaceFunctions.point(point);
        }
    }

    save(): void {
        const path = `${this.entityFolder}/${this.entityName}.${this.templateType}.ts`;
        writeFile(path, this.templateContent);
    }
}