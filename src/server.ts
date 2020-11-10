import Black from "../lib/black";
import { customMidware } from "./mids/index";
import { customFactory } from "./factory/index";

const app = new Black({
    mids: [customMidware],
    factory: [customFactory],
});

app.listen(3009);
