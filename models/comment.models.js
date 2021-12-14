const mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer"
    },
    comment:{
        type:String,
    }
});


const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;