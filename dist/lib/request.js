"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.put = exports.post = exports.get = void 0;
const util_1 = require("./util");
const method = (httpMethod) => (path, options = { tokenVerify: true }) => {
    return (target, key) => {
        //注意中间件的执行顺序
        //token验证
        // options.tokenVerify ? target.middlewares.push(userTokenVerify) : ''
        //接口单独中间件
        options.middlewares ? target.middlewares.push(...options.middlewares) : '';
        //接口前缀
        const url = options.prefix ? options.prefix + path : path;
        target.middlewares ? util_1.router[httpMethod](url, ...target.middlewares, target[key]) : util_1.router[httpMethod](url, target[key]);
    };
};
exports.get = method('get');
exports.post = method('post');
exports.put = method('put');
exports.del = method('del');
