const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
//const ToDo = require('../dataBase/models/ToDo.model');
const Token = require('../dataBase/models/Token.model');
const User = require('../dataBase/models/User.model');
const { nanoid } = require('nanoid');
const { asyncHandler } = require('../middlewares/meddlewares');
//const { where } = require('sequelize/types');

const router = Router();

function initRoutes() {
    router.post('/registration', asyncHandler(registration));
    router.post('/login', asyncHandler(login));
    //router.post('/logout', asyncHandler(login));(А он вообще нужен?)
}

async function registration(req, res, next) {
    const userByLogin = await User.findOne({
        where: {
            login: req.body.login,
        }
    });

    if (userByLogin) {
        throw new ErrorResponse("User already exists", 404);
    }
    await User.create(req.body);


    res.status(200).json({ userByLogin });
}
async function login(req, res, next) {
    const existingUser = await User.findOne(
        {
            where:
            {
                login: req.body.login,
                password: req.body.password,
            }
        }
    );
    if (!existingUser) {
        throw new ErrorResponse("Wromg pamsword or lomgin", 403);
    }
    //console.log(Token.findOne({ where:{id: existingUser.id} }));
    if (await Token.findOne({ where:{id: existingUser.id} })){
        throw new ErrorResponse("Хуйлуша, ты уже в сети", 403);
    }
    const tokenForLogin = await Token.create({
        userId: existingUser.id,
        value: nanoid(128)
    });
    res.status(200).json(tokenForLogin);
}
// async function logout(req, res, next) {

// }

initRoutes();

module.exports = router;