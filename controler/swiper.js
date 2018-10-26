const swiperModel = require( '../model/swiper')
const {Router} = require('express')

const router = Router()

router.get('/swiperlist',async (req,res,next) => {
    try {
        let {page = 1,page_size = 10} = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)
        const data = await swiperModel.find()
            .skip((page - 1)*page_size)
            .limit(page_size)
            .sort({id:-1})
            .populate({path:'newcontent'})

        res.json({
            code:200,
            data,
            msg:'请求成功'
        })
    }catch (err) {
        next(err)
    }
})
router.post('/addswiper',async (req,res,next) => {
    try {
        let {title,pic,newcontent} = req.body
        const data = await swiperModel.create({
            title,
            pic,
            newcontent
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
router.get('/:id',async (req,res,next) => {
    try {
        let { id }  = req.params
        const data = await swiperModel.findById(id)
        res.json({
            code:200,
            data,
            msg:'请求成功'
        })
    }catch (err) {
        next(err)
    }
})
router.post('/editswiper',async (req,res,next) => {
    try {
        let { _id,title,pic,newcontent }  = req.body
        console.log(req.body)
        await swiperModel.update({_id:_id},{title,pic,newcontent})

        res.json({
            code:200,
            msg:'修改成功'
        })
    }catch (err) {
        next(err)
    }
})
router.post('/delswiper',async (req,res,next) => {
    try {
        let {id }= req.query
        console.log( id )
        await swiperModel.remove({_id:id})
        res.json({
            code:200,
            msg:'删除成功'
        })
    }catch (err) {
        next(err)
    }
})

module.exports = router