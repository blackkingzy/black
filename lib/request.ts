import setting from "./setting";
import Black from "./black";
import { userTokenVerify } from "./jwt";
import { HTTPMethod, IRouteOptions } from "./type";


const method = (httpMethod: HTTPMethod) => (
    path: string,
    options?: IRouteOptions
) => {
    return (target: any, key: string, descriptor: PropertyDescriptor): void => {
        const mergeOptions = Object.assign({ tokenVerify: true }, options);
        //注意中间件的执行顺序
        const mids = [];
        //token验证
        setting.token && mergeOptions.tokenVerify ? mids.push(userTokenVerify) : "";
        //接口单独中间件
        mergeOptions.middlewares ? mids.push(...mergeOptions.middlewares) : "";
        //接口前缀
        mids.push(target[key]);
        const url = mergeOptions.prefix ? mergeOptions.prefix + path : path;
        const { $router: router } = Black.getInstance();
        router[httpMethod](url, ...mids);
    };
};

export const get = method("get");
export const post = method("post");
export const put = method("put");
export const del = method("delete");
