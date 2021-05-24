const mongoose = require("mongoose");
const { Schema } =mongoose;


const workoutSchema = new Schema({
    day: Date,
    exercises:[{
        type: String,
        name: String,
        duration: Number,
        weight: Number,
        reps: Number,
        sets: Number, 
    }]
});

//Workout Model
const workoutModel = mongoose.model('Workout', workoutSchema)

module.exports=workoutModel