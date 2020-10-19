import Koa from "koa";
import schema from "async-validator";
import { blackError } from "./error";

const validateRule = (paramPart: string) => (rule: any) => {
    return (target: any, key: string) => {
        const oldMethod = target[key];
        target[key] = async (ctx: Koa.Context, next: Koa.Next) => {
            const validator = new schema(rule);
            //为了不改body-parser的声明文件
            const type = paramPart === "query" ? "query" : "body";
            //注意validate函数的参数写法,不能直接写ctx.request[type]
            await validator
                .validate({ ...ctx.request[type] })
                .catch((error) => {
                    const bk_error = new blackError(422, error);
                    bk_error.error = error.errors;
                    bk_error.fields = error.fields;
                    throw bk_error;
                });
            await oldMethod.apply(null, [ctx, next]);
        };
    };
};

export const query = validateRule("query");
export const body = validateRule("body");
