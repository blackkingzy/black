import koa from "koa";
import { get, post } from "../../lib/request";
import { body } from "../../lib/validator";
import { logger } from "../../lib/log";

class User {
    /**
     * @model user
     * @param ctx
     */
    @post("/zy")
    //验证会先走自定义的，然后在是required的判断等等
    @body({
        username: {
            type: "string",
            required: true,
            validator: (rule: any, value: string) => value === "zhangyue",
        },
        age: { type: "number", required: true },
    })
    async login(ctx: koa.Context) {
        ctx.request.body
        const blogs = ctx.model.blogs;
        const result = await blogs.create({ title: "zhangyue" });
        console.log(result);
        ctx.body = "欢迎来到TS的世界";
    }
    /**
     * @model test
     * @param ctx
     */
    @get("/", { tokenVerify: false })
    async test(ctx: koa.Context) {
        console.log("test");
        logger.log({
            level: "error",
            message: "Hello distributed log files!",
        });
        logger.log({
            level: "warn",
            message: "Hello distributed log files!",
        });
        logger.log({
            level: "info",
            message: "Hello distributed log files!",
        });
        ctx.body = "欢迎来到TS的世界";
    }
}
