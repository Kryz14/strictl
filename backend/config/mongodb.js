import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log(`MongoDB Connected: ${connection.connection.host}`);
        return connection;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        // Don't exit process on Vercel
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1);
        }
        throw error; // Throw error to handle it in the main app
    }
};

// Handling disconnection events
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

export default connectDB;