import express from 'express';
import { CustomRequest } from '../customInterfaces/customRequest';
import { createTodo, getTodos, updateTodo } from '../controllers/todos';

const todosRouter = express.Router();

todosRouter.post('/create',createTodo);
todosRouter.get('/getTodos',getTodos);
todosRouter.put('/updateTodo',updateTodo);

export default todosRouter;