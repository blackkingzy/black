// ts遍历对象或者数组默认的索引签名是number,故想要通过索引是字符串来获取value，必须要写以下接口来更改索引签名
interface dataMap {
    [index: string]: number;
}

export const format = (pattern = "yyyy.MM.dd hh:mm:ss") => {
    const date = new Date();
    const map: dataMap = {
        y: date.getFullYear(), //年份
        M: date.getMonth() + 1, //月份
        d: date.getDate(), //日
        h: date.getHours(), //小时
        m: date.getMinutes(), //分
        s: date.getSeconds(), //秒
        S: date.getMilliseconds(), //毫秒
    };
    for (const key in map) {
        //注意正则表达式的括号
        if (new RegExp(`(${key}+)`).test(pattern)) {
            const diff = RegExp.$1.length - map[key].toString().length;
            pattern = pattern.replace(
                RegExp.$1,
                diff ? `${"0".repeat(diff)}${map[key]}` : `${map[key]}`
            );
        }
    }
    return pattern;
};

console.log(format());
