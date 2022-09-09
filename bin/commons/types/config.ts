export interface Config {
    folders: {
        models: string,
        services: string,
        shared: string,
        home: string,
        store: {
            actions: string,
            reducers: string,
            selectors: string,
            effects: string
        }
    }
}