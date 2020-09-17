"use strict";
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
const setting_1 = __importDefault(require("./setting"));
class Black {
    constructor(option) {
        this.option = option;
        this.$model = {};
    }
    async start() {
        if (setting_1.default.database)
            await initdb_1.connect();
        this.app = new koa_1.default();
        //全局错误处理
        this.app.use(async (ctx, next) => {
            try {
                await next();
            }
            catch (err) {
                const status = err.status || 500;
                //生产环境时 500错误的详细内容不返回给客户端，因为可能包含敏感信息
                const error = status === 500 ? 'Internal Server Error' : err.message;
                //从error对象上读出各个属性，设置到响应中
                ctx.body = {
                    code: status,
                    error: error
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
        //打印log
        if (setting_1.default.log)
            this.app.use(koa_logger_1.default());
        //装载model到ctx
        this.app.use(util_1.loadModel(path_1.resolve(__dirname, "../src/model"), {}, this));
        this.$router = new koa_router_1.default();
        //加载路由和controller
        util_1.load(path_1.resolve(__dirname, "../src/controller"), {}, this);
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
