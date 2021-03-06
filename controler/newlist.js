const newlistModel = require('../model/newlist')
const categoryModel = require('../model/category')
const auth = require('./auth')  //验证
const {Router} = require('express')

const router = Router()

router.post('/addnews',auth,async (req,res,next) => {
    try {
        let {title,content,pic,type} = req.body

        const data = await newlistModel.create({
            title,content,pic,type
        })
        res.json({
            code:200,
            data,
            msg:'添加成功'
        })
    }catch (err) {
        next(err)
    }
})
router.get('/newslist',auth,async (req,res,next) => {
    try {
        let {page = 1, page_size = 10} = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)
        const data = await newlistModel.find()
            .skip((page-1)*page_size)
            .limit(page_size)
            .sort({id:-1})
            .populate({path:'type'})

        const total = await newlistModel.find().count()


        res.json({
            code:200,
            data,
            total,
            msg:'请求成功'
        })
    }catch (err) {
        next(err)
    }
})
router.get('/newsdetail/:id',auth,async (req,res,next) => {
    try {
        let { id } = req.params
        const detaildata = await newlistModel.findById({_id: id})
        res.json({
            code:200,
            detaildata,
            msg:'请求成功'
        })
    }catch (err) {
        next(err)
    }
})
router.post('/newsdetail',auth,async (req,res,next) => {
    try {
        let {_id,title,pic,type,content} = req.body
        await newlistModel.update({_id:_id},{$set:{title,pic,type,content}})

        res.json({
            code:200,
            msg:'修改成功'
        })
    }catch (err) {
        next(err)
    }
})
router.post('/delnews',auth,async(req,res,next) =>{
    try {
        let id = req.body.id
        console.log( id )
        await newlistModel.remove({_id:id})
        res.json({
            code:200,
            msg:'删除成功'
        })
    }catch (err) {
        next(err)
    }
})
router.get('/category',async (req,res,next) => {
   try {
       const data = await categoryModel.find()
       res.json({
           code:200,
           data,
           msg:'获取成功'
       })
   }catch (err) {
       next(err)
   }
})
router.post('/addcategory',async (req,res,next) =>{
    try {
        let {title} = req.body
        const data = await categoryModel.create({title})

        res.json({
            code:200,
            data,
            msg:'添加成功'
        })

    }catch (err) {
        next(err)
    }
})
module.exports = router