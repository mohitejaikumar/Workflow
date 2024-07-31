import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./db/mongoDB";
import authRouter from './routes/auth';
import verifyToken from './middleware/verifyToken';
import todosRouter from './routes/todos';

const port = process.env.PORT || 8080;
// dbConnect
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use(verifyToken);
app.use('/todo', todosRouter)

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});