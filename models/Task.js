const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String
  },
  priority: {
    type: String
  },
  status: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId
  }
});

module.exports = mongoose.model('tasks', taskSchema);
