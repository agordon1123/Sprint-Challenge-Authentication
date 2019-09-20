const db = require('../database/dbConfig');

module.exports = {
    find,
    findBy,
    findById,
    add
}

function find() {
    return db('users')
};

function findBy(filter) {
    return db('users')
        .where(filter)
};

function findById(id) {
    return db('users')
        .first()
        .where({ id })
};

function add(newUser) {
    return db('users')
        .insert(newUser)
};
