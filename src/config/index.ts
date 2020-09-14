import { resolve } from "path";
interface IConfig {
    root: string;
}

const config: IConfig = {
    root: resolve("."),
};

if (process.env.NODE_ENV === "production") {
    // config.db
}

export { config };
