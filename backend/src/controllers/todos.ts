import { CustomRequest } from "../customInterfaces/customRequest";
import { Todos } from "../modals/Todo";
import { Response } from "express";
import { todoSchema } from "../zod/todos";


export const getTodos = async (req: CustomRequest, res: Response) => {

    try {
        const todos = await Todos.find({
            userId:req.userId,
        });
        res.status(200).json(todos);
    } catch (error) {
        console.error("Error in getTodos controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createTodo = async(req: CustomRequest, res: Response) => {
    
    const todoParse = todoSchema.safeParse(req.body);
    if(!todoParse.success){
        
        return res.status(400).json({message:"Invalid Todo"});
    }

    try {
        const newTodo = new Todos({
            title: req.body.title,
            description: req.body.description,
            deadline: req.body.deadline,
            status: req.body.status,
            priority: req.body.priority,
            userId: req.userId,
            createdDate: new Date(),
        });
        await newTodo.save();
        res.status(201).json({ message: "Todo created successfully",todo:newTodo });
    } catch (error) {
        
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateTodo = async(req: CustomRequest, res: Response) => {
    
    const {id,status} = req.body;
    try {
        const updatedTodo = await Todos.findOneAndUpdate({
            _id: id,
            userId:req.userId,
        },{
            status:status,
        },{
            new: true,
        });
        res.status(200).json({ message: "Todo updated successfully",todo:updatedTodo });
    } catch (error) {
        
        res.status(500).json({ message: "Internal server error" });
    }
}