interface DBConfig {
    url: string;
    option?: {
        useNewUrlParser: boolean;

        useUnifiedTopology: boolean;

        useFindAndModify?: boolean
    };
    callback?: (error: any) => void;
}

const dbconfig: DBConfig = {
    url: "mongodb://127.0.0.1:27017/blog",
    option: {
        useNewUrlParser: true,

        useUnifiedTopology: true,

        useFindAndModify: false,
    }
};

export { dbconfig, DBConfig };
