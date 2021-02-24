// controllers dépendencies
const services = require('../services/index');
const bcrypt = require('bcrypt')

// controllers
const user_controller = require('./user');

// create a controllers object for map all the controllers
const controllers = {
    user: user_controller(services, bcrypt),
}

// export our controllers object
module.exports = controllers;