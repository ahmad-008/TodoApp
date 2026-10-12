import express from 'express';
import connectDB from './config/db.js';
import Todo from './models/Todo.js';


const app = express();
connectDB();

app.use(express.json());


//getting all elements
app.get('/api/todos', async (req, res)=>{
    const todos = await Todo.find();
    res.json(todos);
}); 



//Adding new element
app.post('/api/todos', async (req,res) => {
    const {text} = req.body;
    const newTodo = await Todo.create({text});
    res.status(201).json(newTodo);
});



//A way to mark a specific todo as done
app.patch('/api/todos/:id', async (req, res) =>{
    const todo = await Todo.findById(req.params.id);

    if(!todo){
        return res.status(404).json({error: "Todo not found"});
    }

    todo.done = !todo.done; //reversing the true to false and vice versa
    await todo.save();
    res.json(todo);

});



// Deleting the element
app.delete('/api/todos/:id', async(req,res) => {

        const deleted = await Todo.findByIdAndDelete(req.params.id);

        if(!deleted) {
            return res.status(404).json({error: "!Todo not found"});  //If the element isn't found! 
        }

        res.status(204).send();

});






app.listen(5000,() => {
    console.log("server is running on port 5000");
} );
