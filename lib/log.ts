import { createLogger, format, transports } from "winston";
import { utcToLocalString } from "./date";
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${utcToLocalString(
        timestamp,
        "yyyy.MM.dd hh:mm:ss:SSS"
    )} ${level}: ${message}`;
});

export const logger = createLogger({
    format: combine(timestamp(), myFormat),
    transports: [
        new transports.File({
            filename: "log/application.log",
            level: "info",
        }),
        new transports.File({
            filename: "log/errors.log",
            level: "error",
        }),
    ],
    exceptionHandlers: [
        new transports.File({ filename: "log/exceptions.log" }),
    ],
});
