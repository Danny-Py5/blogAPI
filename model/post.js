const mongoose = require('mongoose'); 

const schema = new mongoose.Schema({
    title: {
        required: [true, 'title must be provided'], 
        type: String,
        trim: true,
    }, 
    author: {
        type: String,
        require: [true, 'post author must be provided'],
        trim: true,
    },
    body: {
        required: [true, 'post body must be provided'],
        type: String,
    },
    timeCreated: {
        default: Date.now,
        type: Date
    }
})

const postModel = mongoose.model('post', schema);

module.exports = postModel
