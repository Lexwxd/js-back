const { Router } = require('express');
//const { where } = require('sequelize/types');
const ErrorResponse = require('../classes/error-response');
const Comment = require('../dataBase/models/Comment.model');
const ToDo = require('../dataBase/models/ToDo.model');
const Token = require('../dataBase/models/Token.model');
const User = require('../dataBase/models/User.model');
const { asyncHandler, requireToDo } = require('../middlewares/meddlewares');

const router = Router();

function initRoutes() {
    router.put('/',asyncHandler(requireToDo), asyncHandler(addComent));
    router.post('/:id',asyncHandler(requireToDo), asyncHandler(updateCommnet));
    router.patch('/:id',asyncHandler(requireToDo), asyncHandler(setAsMade));
    router.delete('/:id',asyncHandler(requireToDo), asyncHandler(deleteCommentById));
    router.delete('/',asyncHandler(requireToDo), asyncHandler(deleteComment));
}

async function addComent(req, res, next) {
    await Comment.create(req.body);
    res.status(200).json();
}


async function updateCommnet(req, res, next) {
    const updateCommnet = await Comment.findByPk(
        { where: req.params.id }
    );
    if (!updateCommnet) {
        throw new ErrorResponse("No sumch comment", 404);
    }
    await Comment.update(req.body);
    res.status(200).json(updateCommnet);
}
async function setAsMade(req, res, next) {
    const updateCommnet = await Comment.findByPk(
        { where: req.params.id }
    );
    if (!updateCommnet) {
        throw new ErrorResponse("No sumch comment", 404);
    }
    await Comment.update({ status: "DONE" }, {
        where: req.params.id
    });
}
async function deleteCommentById(req, res, next) {
    const deleteComment = await Comment.findByPk(
        { where: req.params.id }
    );
    if (!deleteComment) {
        throw new ErrorResponse("Already delete, or never was created", 404);
    }
    await Comment.destroy(
        { where: req.params.id }
    );

}
async function deleteComment(req, res, next) {
    await Comment.destroy(
        {
            where:
            {
                toDoid: toDoid
            }
        }
    );

}

initRoutes();

module.exports = router;