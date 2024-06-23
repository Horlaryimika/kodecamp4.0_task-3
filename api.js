const express = require("express");//import express

const { v4: uuidv4 } = require("uuid")// to generate unique IDs

const api = express();//calling express or to create instance in express

api.use(express.json());//middleware to parse incoming json request

api.use(express.urlencoded({extended: false}));

api.listen(3000,function () {
    console.log("This server is up")
});// to listen to request

let tasks = [];//initialize an empty array to store task

//A POST endpoint to add a new task

api.post('/tasks', function (req, res) {
    const { title, body, status } = req.body;
    const newTask = {
        id: uuidv4(),
        title,
        body,
        status
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
    
});

//A get endpoint to get a list of all task
api.get('/tasks', function (req, res) {
    res.json(tasks);
});

//A get endpoint to get a task by it's ID
api.get('/tasks/:id', function (req, res) {
    const task = tasks.find(function (t) {
        return t.id === req.params.id;
    });
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found here' });
    }
});

//An put endpoint to change the title and body of a task
api.put('/tasks/:id', function (req, res) {
    const { title, body } = req.body;
    const task = tasks.find(function (t) {
        return t.id === req.params.id;
    });
    if (task) {
        task.title = title;
        task.body = body;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

//A patch endpoint to change the status of a task
api.patch('/tasks/:id/status', function (req, res) {
    const { status } = req.body;
    const task = tasks.find(function (t) {
        return t.id === req.params.id;
    });
    if (task) {
        task.status = status;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

//A delete endpoint to remove a task from the array of tasks.
api.delete('/tasks/:id', function (req, res) {
    const taskIndex = tasks.findIndex(function (t) {
        return t.id === req.params.id;
    });
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

