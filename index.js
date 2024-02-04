const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const authRoute = require("./routes/index.js");

const app = express();

mongoose.connect('mongodb://localhost:27017/contest',{
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});


app.use(cors(
    {
        origin: ['http://localhost:4200']}
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth",authRoute);

app.get('/test',(req,res)=>{
    res.send("hello")
})
app.listen( process.env.PORT||8080, () => console.log("Server running on port:8080"));
