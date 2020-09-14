import Koa from "koa";
import tconfig from '../src/config/token.config'
import jwt from 'jsonwebtoken'

export const userTokenVerify = async (ctx: Koa.Context, next: Koa.Next) => {
    const userToken = ctx.headers.authorization
    try {
        const decoded = jwt.verify(userToken, tconfig.secret)
        ctx.data = decoded
        await next()
    } catch (error) {
        console.log(error);

    }
}


// export const generate = (Info) => {
//     const token = jwt.sign(Info, tconfig.secret, tconfig.option);
//     return token
// }
