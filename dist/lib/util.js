"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadModel = exports.load = void 0;
const glob_1 = __importDefault(require("glob"));
const path_1 = require("path");
const load = (folder, options = {}, app) => {
    const extname = options.extname || ".{js,ts}";
    //sync返回读取的所有文件的路径数组
    glob_1.default.sync(path_1.join(folder, `./**/*${extname}`))
        .filter((v) => v.indexOf(".spec") === -1) // 排除测试代码
        .filter((v) => /controller/i.test(v))
        .forEach((item) => require(item));
};
exports.load = load;
const loadModel = (folder, options, app) => {
    const extname = options.extname || ".{js,ts}";
    glob_1.default.sync(path_1.join(folder, `./**/*${extname}`))
        .filter((v) => v.indexOf(".spec") === -1) // 排除测试代码
        .forEach((item) => {
        //注意这里的模块化导入
        const { default: model } = require(item);
        app.$model[model.modelName] = model;
    });
    return async (ctx, next) => {
        ctx.model = app.$model;
        await next();
    };
};
exports.loadModel = loadModel;
