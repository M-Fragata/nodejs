import mongoose from "mongoose";

const scheduleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        required: true
    }
})

export const Schedules = mongoose.model("Schedules", scheduleSchema)