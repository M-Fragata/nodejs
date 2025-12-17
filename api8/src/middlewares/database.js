import mongoose from "mongoose"

export const database = async () => {
    // Exemplo de como a URI deve ficar (sem o +srv)
const uri = "mongodb://Fragata:m4th3us1@cluster0-shard-00-00.bdixruu.mongodb.net:27017,cluster0-shard-00-01.bdixruu.mongodb.net:27017,cluster0-shard-00-02.bdixruu.mongodb.net:27017/NOME_DO_BANCO?ssl=true&replicaSet=atlas-xxxx-shard-0&authSource=admin&retryWrites=true&w=majority"

    await mongoose.connect(uri)
    console.log("Conectado ao servidor mongoose")
}