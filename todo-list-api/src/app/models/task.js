const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        require: true,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    finishDate: {
        type: Date,
        default: null
    },
    completed: {
        type: Boolean,
        require: true,
        default: false,
    },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;