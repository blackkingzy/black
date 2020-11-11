"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUpload = void 0;
const fs_1 = __importDefault(require("fs"));
exports.imageUpload = (filePath, targetPath) => {
    return new Promise((resolve, reject) => {
        const reader = fs_1.default.createReadStream(filePath, { highWaterMark: 14 });
        // 创建可写流
        const upStream = fs_1.default.createWriteStream(targetPath, { highWaterMark: 14 });
        reader.on('error', function (error) {
            console.log(error);
            reject();
        });
        upStream.on('finish', function () {
            console.log('文件上传完毕');
            resolve();
        });
        reader.pipe(upStream);
    });
};
