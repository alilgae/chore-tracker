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
  startDate: {
    type: Date,
    required: true,
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
  startDate: doc.startDate,
});

const TaskModel = mongoose.model('Task', TaskSchema);
module.exports = TaskModel;
