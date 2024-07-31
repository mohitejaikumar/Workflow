import express, { Response } from 'express';
import { loginSchema, registerSchema } from '../zod/auth';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { CustomRequest } from '../customInterfaces/customRequest';
import { User } from '../modals/User';
const authRouter = express.Router();


authRouter.post('/login', async (req: CustomRequest, res: Response) => {
    try {
        const { email, password } = loginSchema.parse(req.body);

        const foundUser = await User.findOne({ email });

        if (!foundUser) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, foundUser.password!);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ userId: foundUser.id }, process.env.JWT_SECRET as string, { expiresIn: "6h" });

        res.status(200).json({ token, user: foundUser });
    } catch (error) {
        console.error("Error in login controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

authRouter.post('/register', async (req: CustomRequest, res: Response) => {
    try {
        const { email, name, password } = registerSchema.parse(req.body);
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, name, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error in register controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
);


export default authRouter;