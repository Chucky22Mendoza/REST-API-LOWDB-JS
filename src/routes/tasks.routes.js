const {
    getTasksHandler,
    getTaskHandler,
    createTaskHandler,
    updateTaskHandler,
    deleteTaskHandler,
    setResponseTaskHandler,
    setErrorResponseTaskHandler
} = require('../controller/tasks.controller');

const routes = (req, res) => {
    const { url, method } = req;
    // Logger
    console.log('URL:', url, ' - Method:', method);

    switch (method) {
        case "GET":
            if (url === "/") {
                setResponseTaskHandler(req, res, 200, { message: 'API Running' });
            } else if (url === "/tasks") {
                getTasksHandler(req, res);
            } else if (url.startsWith("/tasks?")) {
                getTaskHandler(req, res);
            } else {
                setErrorResponseTaskHandler(req, res);
            }
            break;
        case "POST":
            if (url === "/tasks") {
                createTaskHandler(req, res);
            } else {
                setErrorResponseTaskHandler(req, res);
            }
            break;
        case "PUT":
            if (url.startsWith("/tasks?")) {
                updateTaskHandler(req, res);
            } else {
                setErrorResponseTaskHandler(req, res);
            }
            break;
        case "DELETE":
            if (url.startsWith("/tasks?")) {
                deleteTaskHandler(req, res);
            } else {
                setErrorResponseTaskHandler(req, res);
            }
            break;
        default:
            setErrorResponseTaskHandler(req, res);
            break;
    }
}

module.exports = {
    routes
};