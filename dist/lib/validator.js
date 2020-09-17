"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.body = exports.query = void 0;
const async_validator_1 = __importDefault(require("async-validator"));
const validateRule = (paramPart) => (rule) => {
    return (target, key) => {
        const oldMethod = target[key];
        target[key] = async (ctx, next) => {
            const validator = new async_validator_1.default(rule);
            //为了不改body-parser的声明文件
            const type = paramPart === "query" ? "query" : "body";
            //注意validate函数的参数写法,不能直接写ctx.request[type]
            await validator.validate(Object.assign({}, ctx.request[type]));
            await oldMethod.apply(null, [ctx, next]);
        };
    };
};
exports.query = validateRule("query");
exports.body = validateRule("body");
