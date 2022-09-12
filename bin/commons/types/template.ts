export enum Template {
    MODEL = "model",
    SERVICE = "service",
    LIST = "list",
    FILTERS = "filters",
    FIELD = "field",
    SELECTION = "selection",
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