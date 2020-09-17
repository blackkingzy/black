import Koa from "koa";
import Router from "koa-router";
import { Secret, SignOptions } from "jsonwebtoken";
import { ConnectionOptions } from "mongoose";

interface Model {
    [model: string]: any;
}

declare class black {
    public app: Koa;
    public $router: Router;
    public $model: Model;
    public $server: any;

    constructor(option?: any);

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

declare class Setting {
    public static root?: string;
    public token: boolean;
    public database: boolean;
    public log: boolean;
    public tconfig: TConfig;
    public dconfig: DBConfig;
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

declare function get(path: string, options: IRouteOptions): Decoration;

declare function post(path: string, options: IRouteOptions): Decoration;

declare function put(path: string, options: IRouteOptions): Decoration;

declare function del(path: string, options: IRouteOptions): Decoration;

declare function query(rule: any): Decoration;

declare function body(rule: any): Decoration;

declare function imageUpload(filePath: string, targetPath: string): void;

declare function format(pattern: string): Decoration;

declare function success(ctx: Koa.Context, res?: any, msg?: string): void;

export {
    DBConfig,
    TConfig,
    black,
    Setting,
    userTokenVerify,
    generate,
    get,
    post,
    put,
    del,
    query,
    body,
    imageUpload,
    format,
    success,
};
