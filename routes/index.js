const express = require("express");
const routes = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const compiler = require("compilex");

const admin_model = require("../models/admin.js");
const teacher_model = require("../models/teacher.js");
const coding_model = require("../models/contest.js");
const student_model = require("../models/student.js");
const result_model = require("../models/result.js");
const quiz_model = require("../models/quiz.js");
const question_model = require("../models/question.js");
const quizresult = require("../models/quizResults.js");
const { async } = require("rxjs");

var options = {stats : true}; //prints stats on console 
compiler.init(options);

routes.use(express.urlencoded({ extended: true }));

routes.post('/registerteacher',async(req,res)=>{
        console.log(req.body);
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password,salt);
        console.log(hash);
        const teacherObj = new teacher_model({
          name:req.body.name,
          username:req.body.username,
          password:hash,
          position:req.body.position,
          email:req.body.email
        });
        await teacherObj.save();
        return res.json(teacherObj);
})

routes.post('/registerStudent',async(req,res)=>{
  console.log(req.body);
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password,salt);
  console.log(hash);
  const studentObj = new student_model({
    name:req.body.name,
    username:req.body.username,
    usn:req.body.usn,
    password:hash,
    branch:req.body.branch,
    section:req.body.section,
    year:req.body.year
  });
  await studentObj.save();
  console.log("registered");
  return res.json(studentObj);
})

routes.post('/login',async(req,res)=>{
        try {
                console.log(req.body);
                let user={}
                if(req.body.role === "admin"){
                 user = await admin_model.findOne({username:req.body.username});
                }
                else if(req.body.role === "teacher"){
                  user = await teacher_model.findOne({username:req.body.username});
                }
                else if(req.body.role === "student"){
                  user = await student_model.findOne({username:req.body.username});
                }
                 console.log(user);
                if (!user) {
                  return res.status(404).send("Account not found");
                }

                const passwordCheck = await bcrypt.compare(req.body.password,user.password);
                if (!passwordCheck) {
                  return res.status(404).send("Password not matched");
                }
               // a += 3
                // let token = this.encrypt(user._id);
                const token = jwt.sign({id:user._id},"veryscrete")

                console.log("logged in successfullyyyy")
                return res.cookie("access_token",token,{httpOnly:true})
                .status(200)
                .json({
                  success: true,
                  message: "Logged in successfully",
                  role: req.body.role,
                  token: token,
                  data:user
                });
              } catch (error) {
                console.log("Incorrect user credentials",error)
                throw error;
              }
})

routes.get('/teachers',async(req,res)=>{
  try{
    let list = await teacher_model.find();
    return res.json(list);
  }catch(error){
    throw error;
  }
})

routes.get('/students',async(req,res)=>{
  try{
    let list = await student_model.find();
    return res.json(list);
  }catch(error){
    throw error;
  }
})

routes.post('/createContest',async(req,res)=>{
  try{
    console.log(req.body); 
    const contestObj = new coding_model(req.body);
    contestObj.type = 'coding';
    await contestObj.save();
    return res.json(contestObj);
  }catch(error){
    throw error;
  }
})

routes.post('/assignStudents',async(req,res)=>{
  try{
    console.log(req.body); 
    const contestObj = await student_model.findOne({
      branch:req.body.branch,
      year:req.body.year,
      section:req.body.section
    });
    const contestId = await coding_model.findOne({_id:req.body.contest});
    contestObj.contests.push(contestId._id);
    console.log(contestObj)
    // console.log('student'+contestObj);
    await contestObj.save();
    return res.json(contestObj);
  }catch(error){
    throw error;
  }
})

routes.post('/getContest',async(req,res)=>{
  try{
    const contestObj = await coding_model.find(req.body).populate('results');
    return res.json(contestObj);
  }catch(error){
    throw error;
  }
})

routes.post('/findStudent',async(req,res)=>{
  try{
    const contestObj = await student_model.findOne(req.body);
    return res.json(contestObj);
  }catch(error){
    throw error;
  }
})

routes.post('/compile', async (req, res) => {
  try {
      console.log(req.body);

      var code = req.body.code;
      var input = req.body.input;

      // Flag to track if a response has been sent
      let responseSent = false;

      if (input === "" || input === null) {
          var envdata = { OS: "windows", cmd: "g++", options: { timeout: 1000 } };
          compiler.compileCPP(envdata, code, function (data) {
              console.log(data);
              if (responseSent) return; // Do nothing if the response has already been sent

              if (data.error) {
                  // Send error response
                  console.log(data.error);
                  res.json({ status: 'error', result: data.error });
              } else {
                  // Send success response
                  console.log(data.output);
                  res.json({ status: 'success', result: data.output });
              }

              responseSent = true; // Set the flag to true after sending the response
          });
      } else {
          var envdata = { OS: "windows", cmd: "g++", options: { timeout: 1000 } };
          
          compiler.compileCPPWithInput(envdata, code, input, function (data) {
              if (responseSent) return; // Do nothing if the response has already been sent

              if (data.error) {
                  // Send error response
                  res.json({ status: 'error', result: data.error });
              } else {
                  // Send success response
                  res.json({ status: 'success', result: data.output });
              }

              responseSent = true; // Set the flag to true after sending the response
          });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', result: 'Internal server error' });
  }
});

routes.post('/uploadResult',async(req,res)=>{
  try{
    console.log(req.body); 
    const contestObj = new result_model(req.body);
    await contestObj.save();
    
    const contest = await coding_model.findOne({_id:req.body.contest});
    contest.results.push(contestObj);
    await contest.save();
    console.log(contest);
    return res.json(contestObj);
  }catch(error){
    throw error;
  }
})

routes.post('/createQuiz',async(req,res)=>{
  try{
    console.log(req.body); 
    const quizObj = new quiz_model(req.body);
    quizObj.type = 'quiz';
    await quizObj.save();
    const student = await student_model.findOne({branch:req.body.branch,year:req.body.year,section:req.body.section});
    student.quiz.push(quizObj);
    await student.save();
    return res.json(quizObj);
  }catch(error){
    throw error;
  }
})

routes.post('/getQuiz',async(req,res)=>{
  try{
    console.log(req.body);
    const quizObj = await quiz_model.find(req.body).populate('questions').populate('results');
    console.log(quizObj);
    return res.json(quizObj);
  }catch(error){
    throw error;
  }
})

routes.post('/addQuestion',async(req,res)=>{
  try{
    console.log(req.body);
    const quizObj = await quiz_model.findOne({_id:req.body.id});
    console.log(quizObj);
    let sno = quizObj.questions.length + 1;
    const questObj = new question_model({slno:sno,question:req.body.quest.question,answer:req.body.quest.answer});
    await questObj.save();
    quizObj.questions.push(questObj);
    await quizObj.save();
    return res.json(quizObj);
  }catch(error){
    throw error;
  }
})

routes.post('/uploadQuiz',async(req,res)=>{
  try{
    console.log(req.body); 
    const contestObj = new quizresult(req.body);
    await contestObj.save();
    
    const contest = await quiz_model.findOne({_id:req.body.quiz});
    contest.results.push(contestObj);
    await contest.save();
    console.log(contest);
    return res.json(contestObj);
  }catch(error){
    throw error;
  }
})

module.exports = routes;
