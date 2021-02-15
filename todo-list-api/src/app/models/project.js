const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const ProjectSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    }],
    createdDate: {
        type: Date,
        default: Date.now
    },
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;