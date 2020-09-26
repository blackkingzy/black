import Koa from "koa";
import { Secret, SignOptions } from "jsonwebtoken";
import { ConnectionOptions } from "mongoose";
import path from "path";
import Black from "./black";

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

export type HTTPMethod = "get" | "put" | "del" | "post" | "patch";

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
