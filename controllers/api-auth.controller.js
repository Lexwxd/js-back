const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
const ToDo = require('../dataBase/models/ToDo.model');
const User = require('../dataBase/models/User.model');
const { asyncHandler } = require('../middlewares/meddlewares');

const router = Router();

function initRoutes() {
    router.post('/registration', asyncHandler(registration));
    router.post('/login', asyncHandler(login));
}

async function registration(req, res, next) {
    const todos = await ToDo.findAll();
    res.status(200).json({
        todos
    });
}
async function login(req, res, next) {
    const todos = await ToDo.findAll();
    res.status(200).json({
        todos
    });
}