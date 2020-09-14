import black from "../lib/black";

interface Option {
    port: number;
}

const option:Option = {
    port: 3009,
};

const app = new black(option);
