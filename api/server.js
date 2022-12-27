const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require("body-parser")

const app = express()

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/todo', {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() => console.log("Connected to DB")).catch(console.error)

// import todo.js
const Todo = require('./models/Todo')

app.get('/todos', async(req,res) => {
    const todos = await Todo.find()

    
    res.json(todos)
})

app.post('/todo/new', (req,res) => {
    const todo = new Todo({
        text: req.body.text,
        timestamp: req.body.timestamp,
        priority: req.body.priority
    })

    todo.save()

    res.json(todo)
})

app.delete('/todo/delete/:id', async (req,res) => {
    const result = await Todo.findByIdAndDelete(req.params.id)

    res.json(result)
})

app.delete('/todo/delete', async (req,res) => {
    const result = await Todo.deleteMany()

    res.json(result)
})

app.get('/todo/complete/:id', async (req,res) => {
    const todo = await Todo.findById(req.params.id)

    todo.complete = !todo.complete

    todo.save()

    res.json(todo)
})

app.put('/todo/increase/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    todo.priority = todo.priority + 1

	todo.save();

	res.json(todo);
});

app.put('/todo/decrease/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    todo.priority = todo.priority - 1

	todo.save();

	res.json(todo);
});

app.listen(3001)