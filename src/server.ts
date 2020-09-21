import black from "../lib/black";
import { customMidware } from "./mids/index";
import { customFactory } from "./factory/index";

const app = new black({
    mids: [customMidware],
    factory: [customFactory],
});

app.listen();
