"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const black_1 = __importDefault(require("../lib/black"));
const option = {
    port: 3009,
};
const app = new black_1.default(option);
