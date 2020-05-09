var Router = require('koa-router')
var router = new Router({
    prefix: '/common'
})
const multer = require('koa-multer')
var Banner = require('../model/banner')
const {NotFound} = require('../../core/http-exception')
var storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,'public/banners/')
    },
    filename:(req, file, cb)=>{
        var fileFormat = (file.originalname).split(".")
        cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1])
    }
})
//加载配置
var upload = multer({ storage: storage });

router.get('/get_banner',async (ctx)=>{
    
    var banners = await Banner.scope('bh').findAll()
    if (!banners) {
        throw new NotFound('资源不存在')
    }
    ctx.body = {
        data: banners,
        msg: 'success',
        code: 0
    }
})


router.post('/add_banner',async (ctx)=>{
    console.log(ctx.request.body.image_name)
    var client = {
        image_url: ctx.request.body.image_name,
        action_url: ctx.request.body.action_url
    }
    await Banner.create(client)

    ctx.body = {
        data: {},
        msg: 'success',
        code: 0
    }
})

router.post('/upload_banner',upload.single('file'),async (ctx)=>{
    ctx.body = {
        filename: ctx.req.file.filename,//返回文件名
        msg:'success',
        error_code:0
      }
})

module.exports = router

