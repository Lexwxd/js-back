const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
const ToDo = require('../dataBase/models/ToDo.model');
const User = require('../dataBase/models/User.model');
const { asyncHandler } = require('../middlewares/meddlewares');


const router = Router();

function initRoutes() {
    router.get('/:id', asyncHandler(getUserInfobyId));
    router.post('/logout', asyncHandler(logout));
    router.patch('/:id', asyncHandler(updateuser));
}


async function getUserInfobyId(req, res, next) {
    const UserInfobyId = await User.findByPk(req.params.id)
    if (!UserInfobyId) {
        throw new ErrorResponse('No such user', 404);
    }
    res.status(200).json({
        todos
    });
}

async function updateuser(req, res, next) {
    const updateuser = await User.findByPk(req.params.id)
    if (!UserInfobyId) {
        throw new ErrorResponse('No such user', 404);
    }
    await User.update(req.body)
    res.status(200).json({
        todos
    });
}

async function logout(req, res, next) {
    const existUser

    res.status(200).json({
        todos
    });
}


