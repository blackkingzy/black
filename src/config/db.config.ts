interface DBConfig {
    url: string;
    option?: {
        useNewUrlParser: boolean;

        useUnifiedTopology: boolean;
    };
    callback?: (error: any) => void;
}

const dbconfig: DBConfig = {
    url: "mongodb://127.0.0.1:27017/blog",
    option: {
        useNewUrlParser: true,

        useUnifiedTopology: true,
    }
};

export { dbconfig, DBConfig };
