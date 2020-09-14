"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTokenVerify = void 0;
const token_config_1 = __importDefault(require("../src/config/token.config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.userTokenVerify = async (ctx, next) => {
    const userToken = ctx.headers.authorization;
    try {
        const decoded = jsonwebtoken_1.default.verify(userToken, token_config_1.default.secret);
        ctx.data = decoded;
        await next();
    }
    catch (error) {
        console.log(error);
    }
};
// export const generate = (Info) => {
//     const token = jwt.sign(Info, tconfig.secret, tconfig.option);
//     return token
// }
