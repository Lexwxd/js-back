const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
const ToDo = require('../dataBase/models/ToDo.model');
const { asyncHandler } = require('../middlewares/meddlewares');

const router = Router();

function initRoutes() {
    router.get('/', asyncHandler(getToDos));
    router.get('/:id', asyncHandler(getToDoById));
    router.post('/', asyncHandler(createToDo));
    router.delete('/', asyncHandler(deleteToDos));
    router.delete('/:id', asyncHandler(deleteToDoById));
    router.patch('/:id', asyncHandler(patchToDo));
}

async function getToDos(req, res, next) {
    const todos = await ToDo.findAll();
    res.status(200).json({ todos });
}

async function getToDoById(req, res, next) {
    const todo = await ToDo.findByPk(req.params.id);

    if (!todo) {
        throw new ErrorResponse('No todo found', 404);
    }

    res.status(200).json(todo);
}
async function createToDo(req, res, next) {
    const id = req.params.index;
    ToDo.update({title: req.body.title, description: req.body.description},
       { where: { id: id } }) 
    res.status(200).json(todo);
}
async function deleteToDos(req, res, next) {
    res.status(200).json(todo);
}
async function deleteToDoById(req, res, next) {
    res.status(200).json(todo);
}
async function patchToDo(req, res, next) {
    res.status(200).json(todo);
}
initRoutes();

module.exports = router;