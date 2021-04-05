const mongoose= require("mongoose");

const schema= new mongoose.Schema({
    ranking: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    score: {
        type: Number,
        trim: true
    },
    event: {
        type: String,
        default: "100m",
        trim: true
    }
});

const Athlete= new mongoose.model("AthletesRanking", schema);

module.exports= Athlete;