const { request } = require("express");
const ErrorResponse = require("../classes/error-response");
const ToDo = require("../dataBase/models/ToDo.model");
const Token = require("../dataBase/models/Token.model");

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const syncHandler = (fn) => (req, res, next) => {
    try {
        fn(req, res, next);
    } catch (error) {
        next(error);
    }
};

const notFound = (req, _res, next) => {
    next(new ErrorResponse(`Not found - ${req.originalUrl}`, 404));
};

const requireToken = async (req, res, next) => {
    const token = req.header("x-access-token");
    if (!token) {
        throw new ErrorResponse("Token was not sent,you ", 404);
    }

    const dbToken = await Token.findOne({
        where: { value: token },
    });

    if (!dbToken) {
        throw new ErrorResponse("Incorrect token", 404);
    }
    req.userId = dbToken.userd;

    next();
};



const requireToDo = (req, _res, next) => {
    const toDo = req.params.id;
    if (!toDo) {
        throw new ErrorResponse('No tomdo id', 404);
    }
    const todoFromDb = ToDo.findOne({
        where: {
            value: toDo
        }
    });
    req.userId = todoFromDb.userId;
};

const errorHandler = (err, _req, res, _next) => {
    console.log('Ошибка', {
        message: err.message,
        stack: err.stack,
    });
    res.status(err.code || 500).json({
        message: err.message
    });
};

module.exports = {
    asyncHandler,
    syncHandler,
    notFound,
    errorHandler,
    requireToken,
    requireToDo,
};