const mongoose = require("mongoose");
const teacherSchema = new mongoose.Schema({
    name: String,
    email:{
        type:String,
        unique:true
    },
    username:{
        type:String,
        unique:true
    },
    password:String,
    position:String,
}, {
    timestamps: true,
});
const teacherModel = mongoose.model("teacher", teacherSchema);
module.exports = teacherModel;