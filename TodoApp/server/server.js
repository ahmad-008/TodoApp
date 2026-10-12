import express from 'express';
import connectDB from './config/db.js';
import todoRoutes from './routes/todoRoutes.js';


const app = express();
connectDB();

app.use(express.json());


app.use('/api/todos', todoRoutes);


app.listen(5000,() => {
    console.log("server is running on port 5000");
} );
