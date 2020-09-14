"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbconfig = void 0;
const dbconfig = {
    url: "mongodb://127.0.0.1:27017/blog",
    option: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
};
exports.dbconfig = dbconfig;
