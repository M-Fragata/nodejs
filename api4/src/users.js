import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /@gmail\.com$/,
        unique: true
    },
    age: {
        type: Number,
        min: 18,
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

export const User = mongoose.model("User", UserSchema)

