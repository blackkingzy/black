import koa from "koa";
import { get, post } from "../../lib/request";
import { body } from "../../lib/validator";

class User {
    /**
     * @model user
     * @param ctx
     */
    @post("/zy",{})
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
        const blogs = ctx.model.blogs;
        const result = await blogs.create({ title: "zhangyue" });
        console.log(result);
        ctx.body = "欢迎来到TS的世界";
    }
    /**
     * @model test
     * @param ctx
     */
    @get("/")
    async test(ctx: koa.Context) {
        console.log('test');
        ctx.body = "欢迎来到TS的世界";
    }
}
