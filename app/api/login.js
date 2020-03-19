const Router = require('koa-router')
const router = new Router({
    prefix: '/login' 
})

const User = require('../model/user')
const {generateToken} = require('../../core/util')
const Auth = require('../../middleware/auth')
const {LoginValidator} = require('../validators/validators')
const {NotFound} = require('../../core/http-exception')
const uuid = require('node-uuid')
router.post('/', async (ctx)=>{
    console.log('ssss')
    var v = await new LoginValidator().validate(ctx)
    var phone = v.get('body.phone')
    var user_id = uuid.v4().replace(/\-/g,'')
    var token = generateToken(user_id,Auth.USER)
    var client = {
        nikename: "",
        user_id,
        phone,
        user_token:token
    } 
    var user = await User.createUser(client)
    if (user) {
        ctx.body = {
            data:{
                token
            },
            msg: 'success',
            error_code:"0"
        }
    } else {
        ctx.body = {
            data:{
                msg: '创建失败'
            },
            msg: 'success',
            error_code:"0"
        }
    }
    
})

module.exports = router