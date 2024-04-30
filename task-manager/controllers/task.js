const Task = require('../models/Task')
const status = require('../helpers/status')
const asyncWrapper = require('../middleware/async')
const { taskIDNotFound,taskDelete,taskExists } = require('../middleware/message')
const { createCustomerError } = require('../errors/custom-error')


const getAllItems = asyncWrapper(async function(req,res,next){
    const tasks = await Task.find({});
    const tasksList = tasks.length;
    // res.status(200).json({ tasks, total:tasksList });
    res
    .status(200)
    .json({ status: status.success, data: {tasks, total:tasksList}})

})

const createTask = asyncWrapper(async function(req, res, next){
    const existingTask = await Task.findOne({ name: req.body.name });
    if (existingTask) {
        return next(createCustomerError( taskExists, 404));
        // return res.status(404).json({ msg: taskExists });
    }
    const task = await Task.create(req.body);
    res.status(200).json({ task });
})

const getTask = asyncWrapper(async function(req,res,next) {
    const taskID = req.params.id;
    const task = await Task.findOne({ _id: taskID})

    if (!task){
        return next(createCustomerError( await taskIDNotFound(taskID), 404))
        // return res.status(404).json({ msg: await taskIDNotFound(taskID) });
    }
    res.json({ task });
})

const updateTask = asyncWrapper(async function(req, res, next) {
    const taskID = req.params.id;
    const { name, completed } = req.body;
    const taskUpdate = await Task.findOneAndUpdate(
        { _id: taskID},
        {$set: {name: name, completed: completed}},
        { new: true, runValidators: true},
    );
    if (!taskUpdate){
        return next(createCustomerError( await taskIDNotFound(taskID), 404));
        // return res.status(404).json({ msg: await taskIDNotFound(taskID) });
    }
    res.status(200).json({ taskUpdate });
})

const deleteTask = asyncWrapper(async function(req,res,next) {
    const taskID = req.params.id;
    const taskDeletion = await Task.findByIdAndDelete({ _id: taskID});
    if (!taskDeletion){
        return next(createCustomerError( await taskDelete(taskID), 404));
        // return res.status(404).json({ msg: await taskDelete(taskID) });
    }
    res.status(200).json({ status:status.success });
})

module.exports = {
    getAllItems,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}