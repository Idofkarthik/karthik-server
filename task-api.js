const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/tasksdb');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const Task = mongoose.model('Task', taskSchema);


app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});


app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});


app.put('/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});


app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

app.listen(4000, () => console.log('Task Manager API running on port 4000'));
