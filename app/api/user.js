const Router = require('koa-router')
const router = new Router({
    prefix: '/user' 
})
const User = require('../model/user')

router.post('/up',async (ctx)=>{
    var res = ctx.request.body
    //先去检查是否有这个用户
    let client = {
        userId: res.userId,
        userName: res.userName,
        token: res.token,
        password: res.password,
        workOrderAuth: res.workOrderAuth,
        organizationId: res.organizationId
    }

    var user = await User.findUser(client.userId)

    if (user) {
        user.update(client)
    } else {
        User.createUser(client)
    }
    ctx.body = {
        data:{},
        msg:'success',
        code:0
    }
})

module.exports = router
