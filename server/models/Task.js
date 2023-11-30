const mongoose = require('mongoose');
const _ = require('underscore');

const setName = (name) => _.escape(name).trim();

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  frequency: {
    type: Number,
    min: 0,
    required: false,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

TaskSchema.statics.toAPI = (doc) => ({
  title: doc.title,
  date: doc.date,
  frequency: doc.frequency,
});

const TaskModel = mongoose.model('Task', TaskSchema);
module.exports = TaskModel;
