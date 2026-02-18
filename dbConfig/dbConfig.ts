import mongoose from "mongoose";

export async function connect(){
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        // mongodb connected successfully
        connection.on("connected", ()=>{
            console.log("MongoDB connected successfully ✅");
        });
        
        // mongodb connection failed
        connection.on("error", (err: Error)=>{
            console.error("MongoDB connection error ❌, please make sure mongodb is running:", err);
            process.exit();
        })

    } catch (error) {
        console.error("Error connecting to MongoDB: ❌", error);
    }
}