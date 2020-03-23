const {
    getTasksHandler,
    getTaskHandler,
    createTaskHandler,
    updateTaskHandler,
    deleteTaskHandler,
    setResponseTaskHandler,
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
                setResponseTaskHandler(req, res, 404, { errorMessage: '404 NOT FOUND, ENTRÁ CAGÓN' });
            }
            break;
        case "POST":
            if (url === "/tasks") {
                createTaskHandler(req, res);
            } else {
                setResponseTaskHandler(req, res, 404, { errorMessage: '404 NOT FOUND, ENTRÁ CAGÓN' });
            }
            break;
        case "PUT":
            if (url.startsWith("/tasks?")) {
                updateTaskHandler(req, res);
            } else {
                setResponseTaskHandler(req, res, 404, { errorMessage: '404 NOT FOUND, ENTRÁ CAGÓN' });
            }
            break;
        case "DELETE":
            if (url.startsWith("/tasks?")) {
                deleteTaskHandler(req, res);
            } else {
                setResponseTaskHandler(req, res, 404, { errorMessage: '404 NOT FOUND, ENTRÁ CAGÓN' });
            }
            break;
        default:
            setResponseTaskHandler(req, res, 404, { errorMessage: '404 NOT FOUND, ENTRÁ CAGÓN' });
            break;
    }
}

module.exports = {
    routes
};