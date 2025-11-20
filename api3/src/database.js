import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        
        const uri = "mongodb+srv://Fragata:m4th3us1@cluster0.bdixruu.mongodb.net/?appName=Cluster0"

        await mongoose.connect(uri)

        console.log("Conectado ao MongoDB com sucesso!")

    } catch (error) {
        console.error("Erro ao conectado ao MongoDB", error.message)
        process.exit(1)
    }
}