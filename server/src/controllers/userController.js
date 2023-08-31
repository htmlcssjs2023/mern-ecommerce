const createError = require('http-errors');
const { users } = require('../models/userModel');

const getUser = (req, res, next) => {
    try {
        res.status(300).send({
              message:"Return to user profile",
              users:users,
        })
        
    } catch (error) {
        next(error);
    }
}

module.exports = {getUser}


