export enum SHARED {
    LIST = "list",
    FILTERS = "filters",
    FIELD = "field",
}

export enum Template {
    MODEL = "model",
    SERVICE = "service",
    SHARED = "shared",
    ACTION = "action",
    REDUCER = "reducer",
    SELECTOR = "selector",
    EFFECT = "effect",
};

export enum WriteMode {
    APPEND = "a+",
    WRITE = "w",
}

export const REPLACE_POINTS_REGEX = /\$!(.*?)!\$/g;