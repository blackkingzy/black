import Koa from "koa";
import glob from "glob";
import Black from "./black";
import { join } from "path";
import { ILoadOptions } from "./type";

//定义router变量指向app.$router
let router: any = null;

const load = (folder: string, options: ILoadOptions = {}, app: Black) => {
    router = app.$router;
    const extname = options.extname || ".{js,ts}";
    //sync返回读取的所有文件的路径数组
    glob.sync(join(folder, `./**/*${extname}`))
        .filter((v) => v.indexOf(".spec") === -1) // 排除测试代码
        .forEach((item) => require(item));
};

const loadModel = (folder: string, options: ILoadOptions, app: Black) => {
    const extname = options.extname || ".{js,ts}";
    glob.sync(join(folder, `./**/*${extname}`))
        .filter((v) => v.indexOf(".spec") === -1) // 排除测试代码
        .forEach((item) => {
            //注意这里的模块化导入
            const { default: model } = require(item);
            app.$model[model.modelName] = model;
        });

    return async (ctx: Koa.Context, next: Koa.Next) => {
        ctx.model = app.$model;
        await next();
    };
};

export { load, loadModel, router };
