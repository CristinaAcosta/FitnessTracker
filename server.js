const mongoose = require ('mongoose');
const { Schema } =mongoose;
const express = require ('express')
var bodyParser = require('body-parser')
const app = express()

app.use(express.json())
app.use(express.static('public'))

async function initializeApp(){
    await mongoose.connect('mongodb+srv://cacost5695:Password@cluster0.mrew3.mongodb.net/cristina-fitness-tracker?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    });
}

const workoutSchema = new Schema({
    type: String,
    name: String,
    weights: Number,
    duration: Number,
    reps: Number,
    sets: Number, 
});


//Workout Model
const workoutModel = mongoose.model('Workout', workoutSchema)

app.put('/api/workouts/:id', async (req, res) => {
    const {type, duration, name, reps, sets, weight} = req.body 
    const workout = new workoutModel()
    workout.day = new Date()
    workout.exercises = {}
    workout.exercises.name = name 
    workout.exercises.type = type
    workout.exercises.duration = duration
    workout.exercises.weight = weight
    workout.exercises.reps = reps
    workout.exercises.sets = sets
    console.log(name, type, duration, reps, sets, weight) 

    await workout 
    .save()
    .then(() => {
        res.send(workout)
    })
    .catch( err => {
        res.send({ })
    })
})

//create exercise API
app.get('/api/workouts/range', async (req, res) => {
    //find all workouts ands return them
    workoutModel.find({})
    .then ( workouts => {
        res.send(workouts)
    })
})

app.get('/exercise', async (req, res) => {
    res.sendFile(__dirname + "/public/exercise.html") 
})

app.get(`/stats`, async (req, res) => {
    res.sendFile(__dirname + "/public/stats.html") 
})

const port = 3000
app.listen(port, async () => {
    await initializeApp ()
    console.log(`example app ${port}`)
    });
