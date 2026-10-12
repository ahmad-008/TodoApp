import Todo from "../models/Todo.js";


//Get path for getting the todos
export const getTodo = async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
};

//creating or adding new element to todo
export const createTodo = async (req, res) => {

    const {text} = req.body;
    const newTodo = await Todo.create({text});
    res.status(201).json(newTodo);
};



//Patch turns the false true vice versa
export const toggleTodo = async (req , res) => {
    const todo = await Todo.findById(req.params.id);

    if(!todo){
        return res.status(404).json({error:'Todo not found!'});
    }

    todo.done = !todo.done;
    await todo.save();
    res.status(200).json(todo);
};


//Deleting the Todo

export const deleteTodo = async (req , res) => {

    const deleted = await Todo.findByIdAndDelete(req.params.id);

    if(!deleted){
        return res.status(404).json({error:'Todo not found!'});
    }

    res.status(204).send();
};
