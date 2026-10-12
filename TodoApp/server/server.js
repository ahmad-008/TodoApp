import express from 'express';

const app = express();

app.use(express.json());

let todos= [

    {
        id:1,
        text:"First task",
        done: false
    },

    {
        id:2,
        text:"second task",
        done: false
    },


];


//getting all elements
app.get('/api/todos', (req, res) => {
    res.json(todos);

});

//Adding new element
app.post('/api/todos',(req, res)=>{

    const {text} = req.body;
    const newTodos = {
        id: todos.length + 1,
        text,
        done: false
    };
    todos.push(newTodos);
    res.status(201).json(newTodos);
});




//A way to mark a specific todo as done
app.patch('/api/todos/:id' , (req, res)=>{

    const id = Number(req.params.id);
    const todo = todos.find(t=> t.id === id);

        if (!todo) {
            return res.status(404).json({error: "Todo not found"});
        }

        //make reverse the true or false
        todo.done = !todo.done;
        res.json(todo);
});



// Deleting the element
app.delete('/api/todos/:id',(req,res)=>{

    const id = Number(req.params.id);

    //exclude the selected and keep all unselected
    todos = todos.filter(t => t.id !== id);

    res.status(204).send();

});






app.listen(5000,() => {
    console.log("server is running on port 5000");
} );
