"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const util_1 = require("./util");
const path_1 = require("path");
const initdb_1 = require("./initdb");
class Black {
    constructor(option) {
        this.option = option;
        this.$model = {};
        this.start();
    }
    async start() {
        await initdb_1.connect();
        this.app = new koa_1.default();
        //全局错误处理
        this.app.use(async (ctx, next) => {
            try {
                await next();
            }
            catch (error) {
                console.log(error);
            }
        });
        //body解析
        this.app.use(koa_bodyparser_1.default());
        //装载model到ctx
        this.app.use(util_1.loadModel(path_1.resolve(__dirname, "../src/model"), {}, this));
        this.$router = new koa_router_1.default();
        //加载路由和controller
        util_1.load(path_1.resolve(__dirname, "../src/controller"), {}, this);
        this.app.use(this.$router.routes());
        await this.listen();
    }
    async listen(callback) {
        const port = this.option.port ? this.option.port : "3000";
        this.app.listen(port, () => {
            callback ? callback() : "";
            console.log(`black framework Start at ${port}`);
        });
    }
}
exports.default = Black;
