import Koa from "koa";
import { Secret, SignOptions } from "jsonwebtoken";
import { ConnectionOptions } from "mongoose";
import Black from "./black";

//专门写type.ts是为了声明与实现分离,以后这个框架变大,可以分离多个文件夹,每个模块有自己的声明文件
//有的类在这里重新声明,是将来要确定类型时从这里拿,不要直接从具体的模块中拿
export interface Model {
    [model: string]: any;
}

type globalMiddleware = (ctx: Koa.Context, next: Koa.Next) => void;

type factoryFunction = (instance: Black) => void;

export interface Option {
    mids?: Array<globalMiddleware>;
    factory?: Array<factoryFunction>;
}

export interface dataMap {
    [index: string]: number;
}

export type HTTPMethod = "get" | "put" | "delete" | "post" | "patch";

export interface IRouteOptions {
    tokenVerify: boolean;
    prefix?: string;
    middlewares?: Koa.Middleware[];
}

export interface DBConfig {
    url: string;
    option?: ConnectionOptions;
    callback?: (error: any) => void;
}

export interface TConfig {
    secret: Secret;
    option?: SignOptions;
    whiteList?: string[];
}

export interface Setting {
    token: boolean;
    database: boolean;
    httplog: boolean;
    root?: string;
    root_prod?: string;
    tconfig?: TConfig;
    dconfig?: DBConfig;
}

export interface ILoadOptions {
    extname?: string;
}

export declare class blackError extends Error {
    public status: number
    public stack: string | undefined
    [key: string]: any
    constructor(code: number, e: Error)
}

