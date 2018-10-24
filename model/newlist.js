const mongoose = require('mongoose')

const Schema = mongoose.Schema

let newList = new Schema({
    title:{
        type:String,
        required:true
    },
    content:String,
    look_num:Number,
    pic:{
        type:String,
        required:true
    },
    type:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'category'
    }
},{versionKey:false,timestamps:{createdAt:'create_time',updatedAt:'update_time'}})

module.exports = mongoose.model('new_list',newList) //声明的表的名字，表的结构