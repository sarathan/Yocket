const express = require('express');
const router = express.Router();

const Task = require('../../models/Task');



router.get('/tasks/:id', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.params.id }).sort({ priority: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/tasks/newTask', async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      priority: req.body.priority,
      status: req.body.status,
      user: req.body.user,
    });

    const task = await newTask.save();

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.put('/tasks/updateTask/:id', async (req, res) => {
  try {

    const task = await Task.findById(req.params.id);
    task.status = "1";
    await task.save();

    return res.json(task);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});


router.delete('/tasks/deleteTask/:id', async (req, res) => {
  try {

    const task = await Task.findById(req.params.id);
    await task.remove();

    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/tasks/updateTask', async (req, res) => {
  try {
    const task = await Task.findById(req.body.id);
    task.title = req.body.title;
    task.priority = req.body.priority;
    await task.save();

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
