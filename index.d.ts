import Koa from "koa";
import Router from "koa-router";
import { Secret, SignOptions } from "jsonwebtoken";
import { ConnectionOptions } from "mongoose";
import { Logger } from "winston";
import { Connection } from "mongoose";

interface Model {
    [model: string]: any;
}

declare class Black {
    public app: Koa;
    public $router: Router;
    public $model: Model;
    public $server: any;
    public $connection: Connection;
    [key: string]: any;

    constructor(option?: Option);

    start(): void;

    listen(port?: number, callback?: () => void);
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

interface Setting {
    token: boolean;
    database: boolean;
    httplog: boolean;
    root?: string;
    root_prod?: string;
    tconfig?: TConfig;
    dconfig?: DBConfig;
}

declare function userTokenVerify(ctx: Koa.Context, next: Koa.Next): void;

declare function generate(Info: any): void;

interface IRouteOptions {
    tokenVerify: boolean;
    prefix?: string;
    middlewares?: Koa.Middleware[];
}

type Decoration = (
    target: any,
    key: string,
    descriptor?: PropertyDescriptor
) => any;

type globalMiddleware = (ctx: Koa.Context, next: Koa.Next) => void;

type factoryFunction = (instance: Black) => void;

interface Option {
    mids?: Array<globalMiddleware>;
    factory?: Array<factoryFunction>;
}

declare function get(path: string, options?: IRouteOptions): Decoration;

declare function post(path: string, options?: IRouteOptions): Decoration;

declare function put(path: string, options?: IRouteOptions): Decoration;

declare function del(path: string, options?: IRouteOptions): Decoration;

declare function query(rule: any): Decoration;

declare function body(rule: any): Decoration;

declare function imageUpload(filePath: string, targetPath: string): void;

declare function format(pattern: string): Decoration;

declare function success(ctx: Koa.Context, res?: any, msg?: string): void;

declare function isDev(): boolean;

declare const logger: Logger;

export {
    //接口
    Black,
    Setting,
    Option,
    //功能函数
    userTokenVerify,
    generate,
    get,
    post,
    put,
    del,
    query,
    body,
    //工具函数
    imageUpload,
    format,
    success,
    isDev,
    //实例
    logger,
};
