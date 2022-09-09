import * as fs from 'fs';

export function fileExists(path: string): boolean {
    try {
        if (fs.existsSync(path)) {
            return true;
        }

        return false;
    } catch (err) {
        return false;
    }
}

export function readFile(path: string): string {
    if (fileExists(path)) {
        return fs.readFileSync(path, 'utf8');
    }

    throw new Error(`Could not find path: ${path}`);
}

export function writeFile(path: string, content: string) {
    return fs.writeFileSync(path, content, { encoding: 'utf-8' });
}

export function formatPath(path: string): string {
    return path.endsWith('/') ? path : path + "/";
}

export function readJson<T>(path: string): T {
    const json = readFile(path);
    const obj: T = JSON.parse(json);
    return obj;
}