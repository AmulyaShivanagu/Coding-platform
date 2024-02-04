const mongoose = require("mongoose");
const resultSchema = new mongoose.Schema({
    contest:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'contest'
    },
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'student'
    },
    answer:String,
    result:String
}, {
    timestamps: true,
});
const resultModel = mongoose.model("result", resultSchema);
module.exports = resultModel;