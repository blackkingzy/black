import Koa from "koa";
import { router } from "./util";
import { userTokenVerify } from "./jwt";
import setting from './setting'

type HTTPMethod = "get" | "put" | "del" | "post" | "patch";

interface IRouteOptions {
    tokenVerify: boolean;
    prefix?: string;
    middlewares?: Koa.Middleware[];
}
const method = (httpMethod: HTTPMethod) => (
    path: string,
    options: IRouteOptions = { tokenVerify: true }
) => {
    return (target: any, key: string, descriptor: PropertyDescriptor): void => {
        //注意中间件的执行顺序
        const mids = [];
        //token验证
        setting.token && options.tokenVerify ? mids.push(userTokenVerify) : "";
        //接口单独中间件
        options.middlewares ? mids.push(...options.middlewares) : "";
        //接口前缀
        mids.push(target[key]);
        const url = options.prefix ? options.prefix + path : path;
        router[httpMethod](url, ...mids);
    };
};

export const get = method("get");
export const post = method("post");
export const put = method("put");
export const del = method("del");
