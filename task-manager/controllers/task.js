const Task = require('../models/Task')



const getAllItems = async function(req,res,next){
    try {   
        const tasks = await Task.find({});
        res.status(200).json({ AllTasks:tasks })

    } catch (err) {
        res.status(500).json({ msg: err.message });
    }

}

const createTask = async function(req, res, next){
    try {
        const existingTask = await Task.findOne({ name: req.body.name });
        if (existingTask) {
            return res.status(404).json({ msg: 'Task already exists'});
        }
        const task = await Task.create(req.body);
        res.status(200).json({ task });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

const getTask = async function(req,res,next) {
    try {
        const taskID = req.params.id;
        const task = await Task.findOne({ _id: taskID})

        if (!task){
            return res.status(404).json({ msg: `Task ${taskID} not found` });
        }
        res.json({ task });
    } catch (err){
        res.status(500).json({ msg: err.message });
    }
}

const updateTask = async function(req, res, next) {
    try {
        const taskID = req.params.id;
        const { name, completed } = req.body;
        const taskUpdate = await Task.findOneAndUpdate(
            { _id: taskID},
            {$set: {name: name, completed: completed}},
            { new: true, runValidators: true},
        );
        if (!taskUpdate){
            return res.status(404).json({ msg: `Task ${taskID} not found` });
        }
        res.status(200).json({ taskUpdate });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const deleteTask = async function(req,res,next) {
    try {
        const taskID = req.params.id;
        const taskDelete = await Task.findByIdAndDelete({ _id: taskID});
        if (!taskDelete){
            return res.status(404).json({ msg: `Task ${taskID} Deletion Failed!` });
        }
        res.status(200).json({ msg: `Task ${taskDelete} deleted successfully`, status: 'success' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

module.exports = {
    getAllItems,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}