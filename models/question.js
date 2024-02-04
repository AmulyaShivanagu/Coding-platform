const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
    slno:Number,
    question: String,
    answer: String
}, {
    timestamps: true,
});
const questionModel = mongoose.model("question", questionSchema);
module.exports = questionModel;