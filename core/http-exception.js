class HttpException extends Error {
    constructor(msg="服务端错误",errorCode=10000,code=400) {
        super()
        this.msg = msg
        this.errorCode = errorCode
        this.code = code
    }
}


class ParameterException extends HttpException {
    constructor(msg,errorCode) {
        super()
        this.msg = msg || '参数错误'
        this.errorCode = errorCode || 10004
        this.code = 404
    }
}

class Success extends HttpException {
    constructor(msg,errorCode) {
        super()
        this.msg = msg || 'ok'
        this.errorCode = errorCode || 0
        this.code = 200
    }
}


class NotFound extends HttpException {
    constructor(msg,errorCode) {
        super()
        this.msg = msg || '无数据'
        this.errorCode = errorCode || 10004
        this.code = 400
    }
}

module.exports = {
    HttpException,
    ParameterException,
    Success,
    NotFound
}