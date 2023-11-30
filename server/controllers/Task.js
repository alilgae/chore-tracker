const models = require('../models');

const { Task } = models;

const makerPage = (req, res) => res.render('app');

const getTasks = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Task.find(query).select('title frequency startDate').lean().exec();

    return res.json({ tasks: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'An error occurred' });
  }
};

const makeTask = async (req, res) => {
  if (!req.body.title || !req.body.frequency || !req.body.startDate) return res.status(400).json({ error: 'All fields required' });

  const taskData = {
    title: req.body.title,
    frequency: req.body.frequency,
    startDate: req.body.startDate,
    owner: req.session.account._id,
  };

  try {
    const newTask = new Task(taskData);
    await newTask.save();
    const returnJSON = {
      title: newTask.title,
      frequency: newTask.frequency,
      startDate: newTask.startDate,
    };
    return res.status(201).json(returnJSON);
  } catch (err) {
    console.log(err);
    // duplicate entry
    if (err.code === 11000) return res.status(400).json({ error: 'Task already exists' });

    return res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = {
  makerPage,
  makeTask,
  getTasks,
};
