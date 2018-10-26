const mongoose = require('mongoose')

const swiper  = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        required:true
    },
    newcontent:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'new_list'
    }

},{versionKey:false,timestamps:{createdAt:'create_time',updatedAt:'updata_time'}})

module.exports = mongoose.model('swiper',swiper)