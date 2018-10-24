const mongoose = require('mongoose')

const category = new mongoose.Schema({
    title:String,
},{versionKey:false,timestamps:{createdAt:'create_time',updatedAt:'updata_time'}})

module.exports = mongoose.model('category',category)