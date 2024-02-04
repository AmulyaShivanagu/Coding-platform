const mongoose = require("mongoose");
const quizresultSchema = new mongoose.Schema({
    quiz:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'quiz'
    },
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'student'
    },
    score:Number
}, {
    timestamps: true,
});
const quizresultModel = mongoose.model("quizresult", quizresultSchema);
module.exports = quizresultModel;