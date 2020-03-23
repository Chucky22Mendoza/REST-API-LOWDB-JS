const { bodyParser } = require('../lib/bodyParser');
const { getConnection } = require('../database');
const { v4 } = require('uuid');

const getTasksHandler = async (req, res) => {
    const tasks = getConnection().get('tasks').value();
    setResponseTaskHandler(req, res, 200, tasks);
}

const getTaskHandler = async (req, res) => {
    try {
        const { idKey, idValue } = getSplitURL(req);

        if (idKey === "id") {
            const task = getConnection().get('tasks').find({id: idValue}).value();
            setResponseTaskHandler(req, res, 200, task);
        } else {
            let errorMessage = "INVALID QUERY";
            setResponseTaskHandler(req, res, 400, { errorMessage })
        }
    } catch (error) {
        let errorMessage = "INVALID BODY DATA WAS PROVIDED: " + error.message;
        setResponseTaskHandler(req, res, 400, { errorMessage })
    }
}

const createTaskHandler = async (req, res) => {
    try {
        await bodyParser(req);
        const { title, description } = req.body
        const newTask = {
            id: v4(),
            title,
            description
        };
        getConnection().get('tasks').push(newTask).write();

        setResponseTaskHandler(req, res, 200, newTask);
    } catch (error) {
        let errorMessage = "INVALID BODY DATA WAS PROVIDED: " + error.message;
        setResponseTaskHandler(req, res, 400, { errorMessage })
    }
}

const updateTaskHandler = async (req, res) => {
    try {
        const { idKey, idValue } = getSplitURL(req);

        if (idKey === "id") {
            await bodyParser(req);

            const result = await getConnection().get('tasks').find({id: idValue})
                .assign(req.body)
                .write();

            setResponseTaskHandler(req, res, 200, result);
        } else {
            let errorMessage = "INVALID QUERY";
            setResponseTaskHandler(req, res, 400, { errorMessage })
        }
    } catch (error) {
        let errorMessage = "INVALID BODY DATA WAS PROVIDED: " + error.message;
        setResponseTaskHandler(req, res, 400, { errorMessage })
    }
}

const deleteTaskHandler = async (req, res) => {
    try {
        const { idKey, idValue } = getSplitURL(req);

        if (idKey === "id") {
            const result = getConnection().get('tasks').remove({id: idValue}).write();
            let successMessage = "Deleted successfully";
            setResponseTaskHandler(req, res, 200, { successMessage });
        } else {
            let errorMessage = "INVALID QUERY";
            setResponseTaskHandler(req, res, 400, { errorMessage })
        }
    } catch (error) {
        let errorMessage = "INVALID BODY DATA WAS PROVIDED: " + error.message;
        setResponseTaskHandler(req, res, 400, { errorMessage })
    }
}

const setResponseTaskHandler = (req, res, status, data) => {
    res.writeHead(status, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(data));
    res.end();
}

const getSplitURL = (req) => {
    let { url } = req;

    let idQuery = url.split("?")[1]; //id={number}
    let idKey = idQuery.split("=")[0];
    let idValue = idQuery.split("=")[1];

    return { idKey, idValue };
}

module.exports = {
    getTasksHandler,
    getTaskHandler,
    createTaskHandler,
    updateTaskHandler,
    deleteTaskHandler,
    setResponseTaskHandler,
};