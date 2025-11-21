import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/@gmail\.com$/, "utilizar 'gmail.com'"]
    },
    age: {
        type: Number,
        required: true
    },
    team: {
        type: String
    },
    distance: {
        type: Number,
        required: true
    }
})

export const User = mongoose.model("User", userSchema)