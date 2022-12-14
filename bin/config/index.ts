import { fileExists, readJson, writeFile } from "../commons/helpers/file";
import { Config as ConfigI } from '../commons/types';
import { default as defaultConfig } from './default.json';

class Config {
    fileName: string;
    configPath: string;
    config: ConfigI;

    constructor(fileName = 'code-generator.json') {
        this.fileName = fileName;
        this.configPath = `${process.cwd()}/${this.fileName}`;

        this.createConfig();
        this.config = this.loadConfig()
    }

    createConfig() {
        if (fileExists(this.configPath)) {
            return;
        }

        writeFile(this.configPath, JSON.stringify(defaultConfig, null, 4));
        console.log("[INFO] Config file created");
        process.exit();
    }

    loadConfig(): ConfigI {
        return readJson<ConfigI>(this.configPath);
    }
}

export const config = new Config();