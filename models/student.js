const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
    contests:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'coding'
    }],
    name:String,
    usn:String,
    branch:String,
    year:String,
    username:String,
    password:String,
    section:String,
    quiz:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'quiz'
        }
    ]
}, {
    timestamps: true,
});
const studentModel = mongoose.model("student", studentSchema);
module.exports = studentModel;