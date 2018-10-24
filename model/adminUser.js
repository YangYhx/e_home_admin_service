const mongoose = require('mongoose')

const Schema = mongoose.Schema

let adminUser = new Schema({
    username:{
        type:String,
        required:true,
        unique:true  //唯一
    },
    password:String,
    avatar:String,
    desc:String,
    sex:Number,
    nickname:{
        type:String,
        required:true,
        unique:true
    },

},{versionKey:false,timestamps:{createdAt:'create_time',updatedAt:'update_time'}})

module.exports = mongoose.model('admin_user',adminUser) //声明的表的名字，表的结构