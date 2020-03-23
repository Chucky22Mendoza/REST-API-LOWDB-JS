const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

let db;

async function createConnection() {
    const adapter = new FileAsync('database.json');
    db = await low(adapter);
    db.defaults({ tasks: [] }).write();
}

const getConnection = () => db;

module.exports = {
    createConnection,
    getConnection
}