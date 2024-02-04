const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    institute:String,
    password:String
}, {
    timestamps: true,
});
const adminModel = mongoose.model("admin", adminSchema);
module.exports = adminModel;