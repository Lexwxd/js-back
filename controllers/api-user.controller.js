const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
//const ToDo = require('../dataBase/models/ToDo.model');
const User = require('../dataBase/models/User.model');
const Token = require('../dataBase/models/Token.model');
const { asyncHandler, requireToken } = require('../middlewares/meddlewares');


const router = Router();

function initRoutes() {
    router.get('/me', asyncHandler(requireToken), asyncHandler(getUserInfoById));
    router.post('/logout', asyncHandler(requireToken), asyncHandler(logout));
    router.patch('/me', asyncHandler(requireToken), asyncHandler(updateuser));
}

//!
async function getUserInfoById(req, res, next) {
    const UserInfobyId = await User.findByPk(req.userId);
    if (!UserInfobyId) {
        throw new ErrorResponse('No such user', 404);
    }
    res.status(200).json(UserInfobyId);
}
//!
async function updateuser(req, res, next) {
    const updateuser = await User.findByPk(req.userId);
    if (!updateuser) {
        throw new ErrorResponse('No such user', 404);
    }
    if (!req.body) {
        throw new ErrorResponse('WHERE MY DATA?', 404);
    }
    await User.update(req.body , {
        where: {
            id: req.userId,

        }
    });
    res.status(200).json({ message: "OK" });
}

async function logout(req, res, next) {
    const dropToken = await Token.destroy({
        where: {
            value: req.header('x-access-token')
        }
    });
    res.status(200).json({ message: "OK" });
}


initRoutes();

module.exports = router;