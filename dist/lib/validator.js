"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.body = exports.query = void 0;
const async_validator_1 = __importDefault(require("async-validator"));
const validateRule = (paramPart) => (rule) => {
    return (target, key) => {
        const validate = async (ctx, next) => {
            const validator = new async_validator_1.default(rule);
            //为了不改body-parser的声明文件
            const type = paramPart === "query" ? "query" : "body";
            await validator.validate(ctx.request[type]);
            await next();
        };
        if (target.middlewares) {
            target.middlewares.push(validate);
        }
        else {
            target.middlewares = [validate];
        }
    };
};
exports.query = validateRule("query");
exports.body = validateRule("body");
