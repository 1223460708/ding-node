//校验token
var basicAuth = require('basic-auth')
var {HttpException} = require('../core/http-exception')
var jwt = require('jsonwebtoken')
class Auth {
    constructor(level) {
        this.level = level
        Auth.USER = 8,
        Auth.ADMIN = 16,
        Auth.SUPER_ADMIN = 32
    }

    get m() {
        return async (ctx,next) => {
            var token = basicAuth(ctx.req) //token 获取到req中的token
            if(!token) {
                throw new HttpException('token不存在',10010,403)
            }
            try {
                var decode = jwt.verify(token.name,global.config.security.secretKey)
            } catch (error) {
                throw new HttpException('无效的token',10010,403)
            }

            if (!decode.scope) {
                throw new HttpException('无效的token',10010,403)
            }
            if (decode.scope < this.level) {
                throw new HttpException('权限不足',10010,403)
            }
            
            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }

            await next()
        }
    }

    get s() {
        return async (ctx,next) => {
            if (ctx.isAuthenticated()) {
                await next()
            } else {
                ctx.status = 401
                ctx.body = {
                    msg: 'auth fail'
                }
            }

        }
    }

    get ws() {
        return async (ctx,next)=>{
            ctx.state.user = parseUser(ctx.cookies.get('name') || '')
            await next()
        }
    }

    static verifyToken(token) {
        try {
            jwt.verify(token,global.config.security.secretKey)
            return true
        } catch (error) {
            return false
        }
    }
    static parseUser(obj) {
        if (!obj) {
            return;
        }
        console.log('try parse: ' + obj);
        let s = '';
        if (typeof obj === 'string') {
            s = obj;
        } else if (obj.headers) {
            let cookies = new Cookies(obj, null);
            s = cookies.get('name');
        }
        if (s) {
            try {
                let user = JSON.parse(Buffer.from(s, 'base64').toString());
                console.log(`User: ${user.name}, ID: ${user.id}`);
                return user;
            } catch (e) {
                // ignore
            }
        }
    }
}

module.exports = Auth
