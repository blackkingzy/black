export default {
    token: false,
    database: true,
    log: true,
    tconfig: {
        secret: "zhangyue",
        option: {
            expiresIn: 60 * 30, //30分钟过期,秒为单位
            //algorithm: 'RS256'//加密算法
        },
        //特殊的接口要放开，以下就是放开图片请求,经过思考，我的框架只给controller中的所有接口加了验证，顾图片请求默认就不验证，所以以下可以删除
        whiteList: ["/upload_images"],
    },
    dconfig: {
        url: "mongodb://127.0.0.1:27017/blog",
        option: {
            useNewUrlParser: true,

            useUnifiedTopology: true,

            useFindAndModify: false,
        },
    },
};

// import path from "path";
// import fs from "fs";
// import { Secret, SignOptions } from "jsonwebtoken";
// import { ConnectionOptions } from "mongoose";

// interface DBConfig {
//     url: string;
//     option?: ConnectionOptions;
//     callback?: (error: any) => void;
// }

// interface TConfig {
//     secret: Secret;
//     option: SignOptions;
//     whiteList?: string[];
// }

// export class Setting {
//     public static root: string = path.resolve(".");
//     public token = false;
//     public database = true;
//     public log = true;
//     public tconfig: TConfig = {
//         secret: "zhangyue",
//         option: {
//             expiresIn: 60 * 30, //30分钟过期,秒为单位
//             //algorithm: 'RS256'//加密算法
//         },
//         //特殊的接口要放开，以下就是放开图片请求,经过思考，我的框架只给controller中的所有接口加了验证，顾图片请求默认就不验证，所以以下可以删除
//         whiteList: ["/upload_images"],
//     };
//     public dconfig: DBConfig = {
//         url: "mongodb://127.0.0.1:27017/blog",
//         option: {
//             useNewUrlParser: true,

//             useUnifiedTopology: true,

//             useFindAndModify: false,
//         },
//     };
// }

// const setting = new Setting();

// if (fs.existsSync(path.join(Setting.root, "setting.ts"))) {
//     Object.assign(setting, require(path.join(Setting.root, "setting")));
// }

// export default setting;
