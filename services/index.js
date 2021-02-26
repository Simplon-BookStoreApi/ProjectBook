// service dépendencies
const repositories = require('../repositories/index'),
    nodemailer = require("nodemailer"),
    jwt = require('jsonwebtoken'),
    cookie = require('cookie');

// services
const user_service = require('./user'),
    mailer_service = require('./mailer'),
    auth_service = require('./auth');

// create a services object to map all the services
const services = {
    user: user_service(repositories),
    mailer: mailer_service(nodemailer),
    jwt: auth_service(jwt, cookie),
}

// export our service object
module.exports = services;