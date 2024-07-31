import mongoose, { ConnectOptions } from 'mongoose';

const uri = process.env.MONGOO_URL!;

export default async function connectDB() {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);
        console.log('Connected to MongoDB');
    }
    catch (err) {
        console.error('Error connecting to MongoDB');
    }
}