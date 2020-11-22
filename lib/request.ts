import setting from "./setting";
import Black from "./black";
import { userTokenVerify } from "./jwt";
import { HTTPMethod, IRouteOptions } from "./type";

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
        const { $router: router } = Black.getInstance();
        router[httpMethod](url, ...mids);
    };
};

export const get = method("get");
export const post = method("post");
export const put = method("put");
export const del = method("delete");
