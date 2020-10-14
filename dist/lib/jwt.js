"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = exports.userTokenVerify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const setting_1 = __importDefault(require("./setting"));
exports.userTokenVerify = async (ctx, next) => {
    const userToken = ctx.headers.authorization;
    try {
        const decoded = jsonwebtoken_1.default.verify(userToken, setting_1.default.tconfig.secret);
        ctx.data = decoded;
        await next();
    }
    catch (error) {
        console.log(error);
    }
};
exports.generate = (Info) => {
    const token = setting_1.default.tconfig.option
        ? jsonwebtoken_1.default.sign(Info, setting_1.default.tconfig.secret, setting_1.default.tconfig.option)
        : jsonwebtoken_1.default.sign(Info, setting_1.default.tconfig.secret);
    return token;
};
