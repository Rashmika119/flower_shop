import mongoose from 'mongoose'
import User from '../models/User.model.js';
const connectDB = async () => {
    try {

        await mongoose.connect('mongodb+srv://rashmikanethsarani119:Ef1xSXYWkDRlZbbo@cluster0.d4fwaij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {

        });
        

    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
}
export default connectDB;