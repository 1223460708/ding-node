var requireDirectory = require('require-directory')
var Router = require('koa-router')

class InitManager {
    static initCore(app) {
        InitManager.app = app
        InitManager.initRouter()
        InitManager.initGoladConfig()
        InitManager.loadHttpException()
    }
    static initRouter() {
        
        var routerDictPath = `${process.cwd()}/app/api`
        var modules = requireDirectory(module,routerDictPath,{
            visit:whenRegistRouter
        })

        function whenRegistRouter(obj) {
            if (obj instanceof Router){
                InitManager.app.use(obj.routes(),obj.allowedMethods())
                
            }
        }
        
    }
    static initGoladConfig(path = '') {
        var configPath = path || '../config/config.js'
        var config = require(configPath)
        global.config = config

    }

    static loadHttpException() {
        const errors = require('./http-exception')
        global.errs = errors
    }
}
module.exports = InitManager