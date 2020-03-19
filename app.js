const Koa = require('koa')
const app = new Koa()

const parser = require('koa-bodyparser')
const json = require('koa-json')
const catchError = require('./middleware/exception')
const InitManager = require('./core/init') 
app.proxy = true
app.use(parser({
    extendTypes:['json','form','text']
}))
app.use(json())


InitManager.initCore(app)
app.use(catchError)


app.listen(3000)
