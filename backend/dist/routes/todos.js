"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_1 = require("../controllers/todos");
const todosRouter = express_1.default.Router();
todosRouter.post('/create', todos_1.createTodo);
todosRouter.get('/getTodos', todos_1.getTodos);
todosRouter.put('/updateTodo', todos_1.updateTodo);
exports.default = todosRouter;
