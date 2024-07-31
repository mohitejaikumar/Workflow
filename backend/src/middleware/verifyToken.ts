import express from "express";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../customInterfaces/customRequest";



const verifyToken = (req: CustomRequest, res: express.Response, next: express.NextFunction) => {

    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        const verified: any = jwt.verify(token, process.env.JWT_SECRET as string);
        req.userId = verified.userId;
        next();
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }
};
export default verifyToken;