const mongoose = require('mongoose')

const googleResultSchema = new mongoose.Schema({
    
    success : {
        type: Boolean,
        required: true,
        unique: false
    },
    query: {
        type: String,
        required: true,
        unique: false
    },
    count: {
        type: Number,
        required: false,
        unique: false
    },
    result : {
        type: Array,
        required: true,
        unique: false
    },
    source : {
        type: String ,
        required: false,
        unique: false
    }
}, {timestamps: true})


const clickResultSchema = new mongoose.Schema({
    
    query: {
        type: String,
        required: true,
        unique: false
    },
    
    result : {
        type: Array,
        required: true,
        unique: false
    },
    source : {
        type: String ,
        required: false,
        unique: false
    }
}, {timestamps: true})

const googleValue = mongoose.model("google_results", googleResultSchema)
const clickValue = mongoose.model("click_result", clickResultSchema)

module.exports = {googleValue, clickValue}