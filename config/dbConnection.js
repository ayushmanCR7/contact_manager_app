const mongoose = require("mongoose")

const connectDB = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("success",
            connect.connection.host,
            connect.connection.name
        );
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectDB