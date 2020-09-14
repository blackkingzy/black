import Koa from 'koa'
import { router } from './util'

type HTTPMethod = 'get' | 'put' | 'del' | 'post' | 'patch'

interface IRouteOptions {
    tokenVerify: boolean
    prefix?: string
    middlewares?: Koa.Middleware[]
}
const method = (httpMethod: HTTPMethod) => (path: string, options: IRouteOptions = { tokenVerify: true }) => {

    return (target: any, key: string): void => {
        //注意中间件的执行顺序
        //token验证
        // options.tokenVerify ? target.middlewares.push(userTokenVerify) : ''
        //接口单独中间件
        options.middlewares ? target.middlewares.push(...options.middlewares) : ''
        //接口前缀
        const url = options.prefix ? options.prefix + path : path
        target.middlewares ? router[httpMethod](url, ...target.middlewares, target[key]) : router[httpMethod](url, target[key])
    }
}



export const get = method('get')
export const post = method('post')
export const put = method('put')
export const del = method('del')

