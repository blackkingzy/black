"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_body_1 = __importDefault(require("koa-body"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const util_1 = require("./util");
const path_1 = require("path");
const initdb_1 = require("./initdb");
const setting_1 = __importStar(require("./setting"));
const helper_1 = require("./helper");
class Black {
    constructor(option) {
        this.option = option;
        this.$model = {};
        this.$server = null;
        this.app = new koa_1.default();
        this.$router = new koa_router_1.default();
    }
    async start() {
        if (setting_1.default.database)
            await initdb_1.connect();
        //全局错误处理
        this.app.use(async (ctx, next) => {
            try {
                await next();
            }
            catch (err) {
                const status = err.status || 500;
                //生产环境时 500错误的详细内容不返回给客户端，因为可能包含敏感信息
                const error = status === 500 ? "Internal Server Error" : err.message;
                //从error对象上读出各个属性，设置到响应中
                ctx.body = {
                    code: status,
                    error: error,
                };
                if (status === 422) {
                    ctx.body.detail = err.errors;
                }
                ctx.status = 200;
            }
        });
        //body解析
        this.app.use(koa_body_1.default({
            multipart: true,
        }));
        //打印控制台log
        if (setting_1.default.log)
            this.app.use(koa_logger_1.default());
        //装载model到ctx
        helper_1.isDev()
            ? this.app.use(util_1.loadModel(path_1.resolve(setting_1.Setting.root, "src/model"), {}, this))
            : this.app.use(util_1.loadModel(path_1.resolve(setting_1.Setting.root_prod, "src/model"), {}, this));
        //加载路由和controller
        helper_1.isDev()
            ? util_1.load(path_1.resolve(setting_1.Setting.root, "src/controller"), {}, this)
            : util_1.load(path_1.resolve(setting_1.Setting.root_prod, "src/controller"), {}, this);
        //将实例挂载在上下文中
        this.app.use(async (ctx, next) => {
            ctx.instance = this;
            await next();
        });
        //加载全局的工厂函数（加工this）
        if (this.option && this.option.factory.length) {
            this.option.factory.forEach((func) => {
                func(this);
            });
        }
        //加载全局自定义中间件
        if (this.option && this.option.mids.length) {
            this.option.mids.forEach((mid) => {
                this.app.use(mid);
            });
        }
        this.app.use(this.$router.routes());
    }
    async listen(port, callback) {
        await this.start();
        port = port || 3000;
        this.$server = this.$server || this.app;
        this.$server.listen(port, () => {
            callback ? callback() : "";
            console.log(`black framework Start at ${port}`);
        });
    }
}
exports.default = Black;
