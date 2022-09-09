import { Replace } from "../types/replace";

export function startCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function findRegex(str: string, regex: RegExp, group = 1): string[] {
    return [...str.matchAll(regex)].map(value => value[group]);
}