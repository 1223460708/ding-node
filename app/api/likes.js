var Router = require('koa-router')
var router = new Router({
    prefix: '/likes_shop'
})
var Likes = require('../model/likes')
const {NotFound} = require('../../core/http-exception')

router.post('/addLikeShop',async (ctx)=>{
    var title = ctx.request.body.title
    var vipPrice = ctx.request.body.vipPrice
    var price = ctx.request.body.price
    const client = {
        title,
        vipPrice,
        price
    }
    let likes = await Likes.create(client)
    ctx.body = {
        data: {},
        msg: 'success',
        code: 0 
    }
})

router.get('/getLikeShop',async (ctx)=>{
    var shops = await Likes.scope('bh').findAll()
    if(!shops) {
        throw new NotFound("没有数据")
    }
    ctx.body = {
        data: shops,
        msg: 'success',
        code: 0 
    }
})


router.get('/jsonp',async(ctx)=>{
    // 前端传过来的参数
    const query = ctx.request.query
    ctx.cookies.set('tokenId', '1')
    // query.cb是前后端约定的方法名字，其实就是后端返回一个直接执行的方法给前端，由于前端是用script标签发起的请求，所以返回了这个方法后相当于立马执行，并且把要返回的数据放在方法的参数里。
    ctx.body = `${query.cb}(${JSON.stringify()})`
})


module.exports = router