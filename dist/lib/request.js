"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.put = exports.post = exports.get = void 0;
const util_1 = require("./util");
const jwt_1 = require("./jwt");
const setting_1 = __importDefault(require("./setting"));
const method = (httpMethod) => (path, options = { tokenVerify: true }) => {
    return (target, key, descriptor) => {
        //注意中间件的执行顺序
        const mids = [];
        //token验证
        setting_1.default.token && options.tokenVerify ? mids.push(jwt_1.userTokenVerify) : "";
        //接口单独中间件
        options.middlewares ? mids.push(...options.middlewares) : "";
        //接口前缀
        mids.push(target[key]);
        const url = options.prefix ? options.prefix + path : path;
        util_1.router[httpMethod](url, ...mids);
    };
};
exports.get = method("get");
exports.post = method("post");
exports.put = method("put");
exports.del = method("del");
