import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { load, loadModel } from "./util";
import { resolve } from "path";
import { connect } from "./initdb";

interface Model {
    [model: string]: any;
}

export default class Black {
    public app: Koa;
    public $router: Router;
    public $model: Model = {};

    constructor(public option: any) {
        this.start();
    }

    async start() {
        await connect();

        this.app = new Koa();

        //全局错误处理
        this.app.use(async (ctx: Koa.Context, next: Koa.Next) => {
            try {
                await next();
            } catch (error) {
                console.log(error);
            }
        });

        //body解析
        this.app.use(bodyParser());

        //装载model到ctx
        this.app.use(loadModel(resolve(__dirname, "../src/model"), {}, this));

        this.$router = new Router();

        //加载路由和controller
        load(resolve(__dirname, "../src/controller"), {}, this);

        this.app.use(this.$router.routes());

        await this.listen();
    }

    async listen(callback?: () => void) {
        const port = this.option.port ? this.option.port : "3000";
        this.app.listen(port, () => {
            callback ? callback() : "";
            console.log(`black framework Start at ${port}`);
        });
    }
}
