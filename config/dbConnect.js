const { default: mongoose } = require("mongoose");

// const dbConnect = () => {
//     try {
//         const conn = mongoose.connect("process.env.MONGODB_URL");
//         console.log("Database connected successfully");
//     }
//     catch (error) {
//         console.log("Database error");
//         // throw new Error(error);
//     }
// };

const dbConnect = async () => {
    try {
        console.log("Connecting to MongoDB:", process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};



module.exports = dbConnect;