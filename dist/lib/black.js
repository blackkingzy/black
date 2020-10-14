"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_body_1 = __importDefault(require("koa-body"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const setting_1 = __importDefault(require("./setting"));
const util_1 = require("./util");
const path_1 = require("path");
const db_1 = require("./db");
const helper_1 = require("./helper");
const log_1 = require("./log");
const error_1 = require("./error");
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
            await db_1.connect(setting_1.default, this);
        //打印控制台log
        if (setting_1.default.httplog)
            this.app.use(koa_logger_1.default());
        //全局错误处理
        this.app.use(error_1.globalHandleError);
        //body解析
        this.app.use(koa_body_1.default({
            multipart: true,
        }));
        //装载model到ctx
        helper_1.isDev()
            ? this.app.use(util_1.loadModel(path_1.resolve(setting_1.default.root, "src/model"), {}, this))
            : this.app.use(util_1.loadModel(path_1.resolve(setting_1.default.root_prod, "src/model"), {}, this));
        //加载全局的工厂函数（加工this）
        if (this.option && this.option.factory && this.option.factory.length) {
            this.option.factory.forEach((func) => {
                func(this);
            });
        }
        //将实例挂载在上下文中
        this.app.use(async (ctx, next) => {
            ctx.instance = this;
            await next();
        });
        // //加载全局自定义中间件
        if (this.option && this.option.mids && this.option.mids.length) {
            this.option.mids.forEach((mid) => {
                this.app.use(mid);
            });
        }
        //加载路由和controller
        helper_1.isDev()
            ? util_1.load(path_1.resolve(setting_1.default.root, "src/controller"), {}, this)
            : util_1.load(path_1.resolve(setting_1.default.root_prod, "src/controller"), {}, this);
        this.app.use(this.$router.routes());
    }
    async listen(port, callback) {
        try {
            await this.start();
            port = port || 3000;
            this.$server = this.$server || this.app;
            this.$server.listen(port, () => {
                callback ? callback() : "";
                console.log(`black framework Start at ${port}`);
            });
        }
        catch (error) {
            log_1.logger.error(error.stack);
        }
    }
}
exports.default = Black;
