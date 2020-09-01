const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diarySchema = new Schema({
    id : String,
    title : String,
    diary : String,
    date : {
        type : Date,
        default : Date.now()
    }
})
const accountSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    diaries : [diarySchema]
})

const diaryModel = mongoose.model('diary', accountSchema);

module.exports = diaryModel;