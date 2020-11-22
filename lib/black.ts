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
import { Option, Model } from "./type";
import { globalHandleError } from "./error";

export default class Black {
    public app: Koa;
    public $router: Router;
    public $model: Model = {};
    public $server: any = null;
    public $connection: Connection | undefined;
    public static instance: Black;
    [key: string]: any;

    constructor(public option?: Option) {
        this.app = new Koa();
        this.$router = new Router();
        Black.instance = this;
    }

    async start() {
        if (setting.database) await connect(setting, this);

        //打印控制台log
        if (setting.httplog) this.app.use(koalogger());

        //全局错误处理
        this.app.use(globalHandleError);

        //body解析
        this.app.use(
            koabody({
                multipart: true,
            })
        );

        //装载model到ctx
        isDev()
            ? this.app.use(
                loadModel(
                    resolve(setting.root as string, "src/model"),
                    {},
                    this
                )
            )
            : this.app.use(
                loadModel(
                    resolve(setting.root_prod as string, "src/model"),
                    {},
                    this
                )
            );

        //加载全局的工厂函数（加工this）
        if (this.option && this.option.factory && this.option.factory.length) {
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
        if (this.option && this.option.mids && this.option.mids.length) {
            this.option.mids.forEach((mid) => {
                this.app.use(mid);
            });
        }

        //加载路由和controller
        isDev()
            ? load(resolve(setting.root as string, "src/controller"), {}, this)
            : load(
                resolve(setting.root_prod as string, "src/controller"),
                {},
                this
            );

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
    
    /**
     * 获取black实例
     */
    static getInstance() {
        return Black.instance;
    }
}
