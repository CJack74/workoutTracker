//Dependencies
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const path = require("path");
const Workout = require("./models/workout")

const PORT = process.env.PORT || 3000
//Mongoose connection to workout database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true
});

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static("public"));


app.get("/" ,function(req,res) {
    res.sendFile(path.join(__dirname,"/public/views/index.html"));
});

app.get("/exercise", function (req,res) {
    res.sendFile(path.join(__dirname,"/public/views/exercise.html"));
});

app.get("/stats" ,function(req,res) {
    res.sendFile(path.join(__dirname,"/public/views/stats.html"));
});

app.post("/api/workouts", ({body}, res) => {
    Workout.create({
        day: new Date()
    })
    .then((data) => res.json(data))
    .catch(e => console.error(e))
});

app.get("/api/workouts", (req, res) => {
    Workout.find({}, (error, data) => {
        if(error) {
            res.send(error)
        }else {
            console.log(data)
            res.json(data)
        }
    });
})

app.get("/api/workouts/range", (req, res) => {
    Workout.find().limit(7)
        .then(workout =>res.json(workout))
        .catch(e => console.error(e))
    console.log(req.body);
})

app.put("/api/workouts/:id", (req, res) => {
    console.log(req.body)
    Workout.findByIdAndUpdate(req.params.id, {
        $push: {
            exercises:req.body
        }
    }, 
    {
        new:true,
        runValidators:true
    })
    .then(()=> res.sendStatus(200))
    .catch(e=> console.error(e))
});

app.listen(PORT, function () {
    console.log(`App running on port ${PORT}!`);
});