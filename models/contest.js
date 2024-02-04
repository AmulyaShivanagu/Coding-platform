const mongoose = require("mongoose");
const codingSchema = new mongoose.Schema({
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'teacher'
    },
    name:String,
    question: String,
    input: String,
    output: String,
    testCase1: String,
    tc1ans:String,
    tc2ans:String,
    testCase2: String,
    type:String,
    section:String,
    branch:String,
    year:String,
    results:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'result'
        }
    ]
}, {
    timestamps: true,
});
const codingModel = mongoose.model("coding", codingSchema);
module.exports = codingModel;