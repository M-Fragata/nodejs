import mongoose from "mongoose"

export const mongooseDB = async () => {
    const uri = "mongodb+srv://Fragata:m4th3us1@cluster0.bdixruu.mongodb.net/?appName=Cluster0"
    await mongoose.connect(uri)

    console.log("conectado ao uri mongoose")
}