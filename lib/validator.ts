import koa from "koa";
import schema from "async-validator";

const validateRule = (paramPart: string) => (rule: any) => {
    return (target: any, key: string) => {
        const validate = async (ctx: koa.Context, next: koa.Next) => {
            const validator = new schema(rule);
            //为了不改body-parser的声明文件
            const type = paramPart === "query" ? "query" : "body";
            await validator.validate(ctx.request[type]);
            await next();
        };
        if (target.middlewares) {
            target.middlewares.push(validate);
        } else {
            target.middlewares = [validate];
        }
    };
};

export const query = validateRule("query");
export const body = validateRule("body");
