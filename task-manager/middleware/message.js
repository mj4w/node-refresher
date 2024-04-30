const taskIDNotFound = async (task) => {
    return `Task ${task} not found`;
};

const taskDelete = async (task) => {
    return `Task ${task} already deleted`;
};

const taskExists = "Task already exists";

module.exports = {
    taskIDNotFound,
    taskDelete,
    taskExists
};