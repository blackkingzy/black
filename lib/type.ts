import Koa from "koa";
import { Secret, SignOptions } from "jsonwebtoken";
import { ConnectionOptions } from "mongoose";
import path from "path";
import Black from "./black"

export interface Model {
    [model: string]: any;
}


type globalMiddleware = (ctx: Koa.Context, next: Koa.Next) => void;

type factoryFunction = (app?: Black) => void;

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

interface DBConfig {
    url: string;
    option?: ConnectionOptions;
    callback?: (error: any) => void;
}

interface TConfig {
    secret: Secret;
    option: SignOptions;
    whiteList?: string[];
}

export class Setting {
    public static root: string = path.resolve(".");
    public static root_prod = `${path.resolve(".")}/dist`;
    public token = false;
    public database = false;
    public httplog = true;
    public tconfig: TConfig;
    public dconfig: DBConfig;
}

export interface ILoadOptions {
    extname?: string;
}
