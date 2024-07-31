"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const Todo_1 = require("../modals/Todo");
const todos_1 = require("../zod/todos");
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todo_1.Todos.find({
            userId: req.userId,
        });
        res.status(200).json(todos);
    }
    catch (error) {
        console.error("Error in getTodos controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getTodos = getTodos;
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoParse = todos_1.todoSchema.safeParse(req.body);
    if (!todoParse.success) {
        return res.status(400).json({ message: "Invalid Todo" });
    }
    try {
        const newTodo = new Todo_1.Todos({
            title: req.body.title,
            description: req.body.description,
            deadline: req.body.deadline,
            status: req.body.status,
            priority: req.body.priority,
            userId: req.userId,
            createdDate: new Date(),
        });
        yield newTodo.save();
        res.status(201).json({ message: "Todo created successfully", todo: newTodo });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createTodo = createTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, status } = req.body;
    try {
        const updatedTodo = yield Todo_1.Todos.findOneAndUpdate({
            _id: id,
            userId: req.userId,
        }, {
            status: status,
        }, {
            new: true,
        });
        res.status(200).json({ message: "Todo updated successfully", todo: updatedTodo });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateTodo = updateTodo;
