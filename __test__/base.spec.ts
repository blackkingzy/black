import Koa from "koa"
import Black from "../lib/black"
import { utcToLocalString } from "../lib/date"
import { success, isDev } from "../lib/helper"
import { connect } from "../lib/db"
import { Setting } from "../lib/type"


const customMidware = async (ctx: Koa.Context, next: Koa.Next) => {
    await next();
};

const customFactory = (app: Black) => {
    console.log('test customFactory');
};


const setting: Setting = {
    token: false,
    database: true,
    httplog: true,
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



describe("test all function", () => {
    // test("test Black", async () => {
    //     await new Black({
    //         mids: [customMidware],
    //         factory: [customFactory],
    //     }).start()
    // });

    test("test utcToLocalString function", () => {
        const date = new Date();
        utcToLocalString(date.toDateString())
    })

    test("test success function", () => {
        const ctx = {} as Koa.Context;
        success(ctx)
    })

    test("test isDev function", () => {
        process.argv[0] = "ts-node"
        expect(isDev()).toBe(true);
        process.argv[0] = "node"
        expect(isDev()).toBe(false);
    })

    test("test connect function", async () => {
        const connection = await connect(setting)
        connection.close()
        setting.dconfig.option = null
        const connection2 = await connect(setting)
        connection2.close()
    })
});

