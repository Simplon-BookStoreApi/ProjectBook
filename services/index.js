// service dépendencies
const repositories = require('../repositories/index'),
    nodemailer = require("nodemailer");

// services
const user_service = require('./user'),
    mailer_service = require('./mailer');
const book_service = require("./book")

// create a services object for map all the services
const services = {
    user: user_service(repositories),
    mailer: mailer_service(nodemailer),
    book: book_service(repositories)
}

// export our service object
module.exports = services;