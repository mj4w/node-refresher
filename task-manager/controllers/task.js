const getAllItems = (req,res) => {
    res.send('ALL ITEMS from the file')

}

const createTask = (req, res) => {
    res.json(req.body)
}

const getTask = (req, res) => {
    res.json({ id: req.params.id })
}

const updateTask = (req, res) => {
    res.send('Update Task ')

}

const deleteTask = (req,res) => {
    res.send('Delete Task ')
}

module.exports = {
    getAllItems,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}