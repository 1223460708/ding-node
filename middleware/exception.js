//全局错误
var {HttpException} = require('../core/http-exception')

var catchError = async (ctx,next) => {

    try {
        await next()
    } catch (error) {
        var isDev = global.config.den === 'dev'
        var isHttp = error instanceof HttpException

        if (isDev && !isHttp) {
            throw error
        }
        if (isHttp) {
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                requestUrl: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 200
        } else {
            ctx.body = {
                msg: 'error.msg',
                error_code: 999,
                requestUrl: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
   
    }

}

module.exports = catchError