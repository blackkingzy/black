import Koa from "koa";
import Router from "koa-router";
import { Secret, SignOptions } from "jsonwebtoken";
import { ConnectionOptions } from "mongoose";
import { Logger } from "winston";
import { Connection } from "mongoose";
//以下包引入是为了让vscode找到其的声明文件
import koabody from "koa-body";

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

declare function tokenVerify(token: string): any;

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

declare class blackError extends Error {
    public status: number;
    public stack: string | undefined;
    [key: string]: any;
    constructor(code: number, e: Error);
}

//注意：index.d.ts是为了声明,index.ts是为了实际的使用,尽量保持一致性
export {
    //接口
    Black,
    Setting,
    blackError,
    //功能函数
    tokenVerify,
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
