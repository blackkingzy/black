"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tconfig = {
    secret: 'zhangyue',
    option: {
        expiresIn: 60 * 30,
    },
    //特殊的接口要放开，以下就是放开图片请求,经过思考，我的框架只给controller中的所有接口加了验证，顾图片请求默认就不验证，所以以下可以删除
    whiteList: ['/upload_images']
};
exports.default = tconfig;
