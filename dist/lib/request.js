"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.put = exports.post = exports.get = void 0;
const setting_1 = __importDefault(require("./setting"));
const black_1 = __importDefault(require("./black"));
const jwt_1 = require("./jwt");
const method = (httpMethod) => (path, options) => {
    return (target, key, descriptor) => {
        const mergeOptions = Object.assign({ tokenVerify: true }, options);
        //注意中间件的执行顺序
        const mids = [];
        //token验证
        setting_1.default.token && mergeOptions.tokenVerify ? mids.push(jwt_1.userTokenVerify) : "";
        //接口单独中间件
        mergeOptions.middlewares ? mids.push(...mergeOptions.middlewares) : "";
        //接口前缀
        mids.push(target[key]);
        const url = mergeOptions.prefix ? mergeOptions.prefix + path : path;
        const { $router: router } = black_1.default.getInstance();
        router[httpMethod](url, ...mids);
    };
};
exports.get = method("get");
exports.post = method("post");
exports.put = method("put");
exports.del = method("delete");
