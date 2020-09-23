import Koa from "koa";
import Router from "koa-router";
import koabody from "koa-body";
import koalogger from "koa-logger";
import setting from "./setting";
import { load, loadModel } from "./util";
import { resolve } from "path";
import { connect } from "./db";
import { isDev } from "./helper";
import { logger } from "./log";
import { Connection } from "mongoose";
import { Option, Model, Setting } from "./type";

export default class Black {
    public app: Koa;
    public $router: Router;
    public $model: Model = {};
    public $server: any = null;
    public $connection: Connection;
    [key: string]: any;

    constructor(public option?: Option) {
        this.app = new Koa();
        this.$router = new Router();
    }

    async start() {
        if (setting.database) await connect(setting, this);

        //全局错误处理
        this.app.use(async (ctx: Koa.Context, next: Koa.Next) => {
            try {
                await next();
            } catch (err) {
                logger.error(err.stack);
                const status = err.status || 500;
                //生产环境时 500错误的详细内容不返回给客户端，因为可能包含敏感信息
                const error =
                    status === 500 ? "Internal Server Error" : err.message;

                //从error对象上读出各个属性，设置到响应中
                ctx.body = {
                    code: status, //服务器自身的处理逻辑错误（包含框架错误500及自定义业务逻辑错误533开始）客户端请求参数导致的错误（4xx开始），设置不同的状态码
                    error: error,
                };
                if (status === 422) {
                    ctx.body.detail = err.errors;
                }
                ctx.status = 200;
            }
        });

        //body解析
        this.app.use(
            koabody({
                multipart: true,
            })
        );
        //打印控制台log
        if (setting.httplog) this.app.use(koalogger());

        //装载model到ctx
        isDev()
            ? this.app.use(
                loadModel(resolve(Setting.root, "src/model"), {}, this)
            )
            : this.app.use(
                loadModel(resolve(Setting.root_prod, "src/model"), {}, this)
            );

        //加载全局的工厂函数（加工this）
        if (this.option && this.option.factory.length) {
            this.option.factory.forEach((func) => {
                func(this);
            });
        }

        //将实例挂载在上下文中
        this.app.use(async (ctx: Koa.Context, next: Koa.Next) => {
            ctx.instance = this;
            await next();
        });

        // //加载全局自定义中间件
        if (this.option && this.option.mids.length) {
            this.option.mids.forEach((mid) => {
                this.app.use(mid);
            });
        }

        //加载路由和controller
        isDev()
            ? load(resolve(Setting.root, "src/controller"), {}, this)
            : load(resolve(Setting.root_prod, "src/controller"), {}, this);

        this.app.use(this.$router.routes());
    }

    async listen(port?: number, callback?: () => void) {
        try {
            await this.start();
            port = port || 3000;
            this.$server = this.$server || this.app;
            this.$server.listen(port, () => {
                callback ? callback() : "";
                console.log(`black framework Start at ${port}`);
            });
        } catch (error) {
            logger.error(error.stack);
        }
    }
}
