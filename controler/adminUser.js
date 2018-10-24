const {Router} = require('express')
const adminUserModel = require('../model/adminUser')
const auth = require('./auth')  //验证

const router = Router()

router.post('/',auth, async (req,res,next) => {   //添加模块
    try {
        let {
            username,
            password,
            avatar,
            desc,
            sex,
            nickname
        } = req.body

        const data = await adminUserModel.create({
            username,
            password,
            avatar,
            desc,
            sex,
            nickname
        })
        res.json({
            code:200,
            data,
            msg:'创建成功'
        })
    }catch (err) {
        next(err)
    }
})
router.post('/login',async (req,res,next)=> {
    let {username,password} = req.body
    if(username&&password){
        const user = await adminUserModel.findOne({username})
        if(user){
            if(user.password == password){
                req.session.user = user  //疑问1： 为什么这里是req.session 这个session存到了哪里
                res.json({
                    code:200,
                    msg:'登录成功'
                })
            }else {
                res.json({
                    code:401,
                    msg:'密码不正确'
                })
            }
        }
        else {
            res.json({
                code:402,
                msg:'用户未注册'
            })
        }
    }else{
        res.json({
            code:400,
            msg:'缺少必要参数'
        })
    }


})
router.get('/userlist',async (req,res,next) => {
    try {
        let{ page = 1,page_size = 10} = req.params
        page = parseInt(page)
        page_size = parseInt(page_size)
        const data = await  adminUserModel.find()
            .skip((page-1)*page_size)
            .limit(page_size)
            .sort({id:-1})
            .select("-password")

        res.json({
            code: 200,
            data,
            msg:'成功'
        })
    }catch (err) {
        next(err)
    }
})
module.exports = router
