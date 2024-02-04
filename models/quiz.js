const mongoose = require("mongoose");
const quizSchema = new mongoose.Schema({
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'teacher'
    },
    name:String,
    questions: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'question'
        }
    ],
    type:String,
    year:String,
    branch:String,
    section:String,
    results:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'quizresult'
        }
    ]
}, {
    timestamps: true,
});
const quizModel = mongoose.model("quiz", quizSchema);
module.exports = quizModel;