import express from 'express';
import {getTodo, createTodo, toggleTodo, deleteTodo} from '../controllers/todoController.js';

const router = express.Router();

router.get('/', getTodo);
router.post('/',createTodo);
router.patch('/:id', toggleTodo);
router.delete('/:id', deleteTodo);

export default router;