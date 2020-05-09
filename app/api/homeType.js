var Router = require('koa-router')
var router = new Router({
    prefix: '/home_type'
})

var HomeClassify = require('../model/homeType')


//客户端调用
router.get('/',async (ctx)=>{
    let data = await HomeClassify.findAll()
    ctx.body = {
        data: data,
        msg: 'success',
        code: 0 
    }
})

module.exports = router