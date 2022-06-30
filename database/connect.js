import mongoose from "mongoose";

try {
    mongoose.connect(process.env.URI_MONGO)
    console.log("db ok")
} catch (error) {
    console.log('database no connected ' +error)
}

