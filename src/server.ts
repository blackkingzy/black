import black from "../lib/black";
import { customMidware } from "./mids/index";

const app = new black({
    mids: [customMidware],
});

app.listen();
