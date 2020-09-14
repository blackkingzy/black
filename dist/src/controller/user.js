"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const request_1 = require("../../lib/request");
const validator_1 = require("../../lib/validator");
class User {
    /**
     * @model user
     * @param ctx
     */
    async login(ctx) {
        console.log(ctx.request.body.username);
        console.log(ctx.model.blog);
        console.log("欢迎登陆");
        ctx.body = "欢迎来到TS的世界";
    }
}
__decorate([
    request_1.post("/zy")
    //验证会先走自定义的，然后在是required的判断等等
    ,
    validator_1.body({
        username: {
            type: "string",
            required: true,
            validator: (rule, value) => value === "zhangyue",
        },
        age: { type: "number", required: true },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], User.prototype, "login", null);
