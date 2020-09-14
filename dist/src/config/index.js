"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const path_1 = require("path");
const config = {
    root: path_1.resolve("."),
};
exports.config = config;
if (process.env.NODE_ENV === "production") {
    // config.db
}
