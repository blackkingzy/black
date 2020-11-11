"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const date_1 = require("./date");
const { combine, timestamp, printf } = winston_1.format;
const myFormat = printf(({ level, message, timestamp }) => {
    return `${date_1.utcToLocalString(timestamp, "yyyy.MM.dd hh:mm:ss:SSS")} ${level}: ${message}`;
});
exports.logger = winston_1.createLogger({
    format: combine(timestamp(), myFormat),
    transports: [
        new winston_1.transports.File({
            filename: "log/application.log",
            level: "info",
        }),
        new winston_1.transports.File({
            filename: "log/errors.log",
            level: "error",
        }),
    ],
    exceptionHandlers: [
        new winston_1.transports.File({ filename: "log/exceptions.log" }),
    ],
});
