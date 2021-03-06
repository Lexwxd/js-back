const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
const ToDo = require('../dataBase/models/ToDo.model');
//const User = require('../dataBase/models/User.model');
const { asyncHandler, requireToken } = require('../middlewares/meddlewares');

const router = Router();

function initRoutes() {
    router.get('/',asyncHandler(requireToken), asyncHandler(getToDos));
    router.get('/:id',asyncHandler(requireToken), asyncHandler(getToDoById));
    router.post('/',asyncHandler(requireToken), asyncHandler(createToDo));
    router.delete('/:id',asyncHandler(requireToken), asyncHandler(deleteToDoById));
    router.delete('/',asyncHandler(requireToken), asyncHandler(deleteToDos));
    router.patch('/:id',asyncHandler(requireToken), asyncHandler(patchToDos));
}

async function getToDos(req, res, next) {
    const todos = await ToDo.findAll();
    res.status(200).json({
        todos
    });
}

async function getToDoById(req, res, next) {
    const todo = await ToDo.findByPk(req.params.id);
    if (!todo) {
        throw new ErrorResponse('No todo found', 404);
    }

    res.status(200).json(todo);
}
async function createToDo(req, res, next) {
    //const user = await User.create();
    const todo = await ToDo.create({
        title: req.body.title,
        description: req.body.description,

    });
    res.status(200).json(todo);
}
async function deleteToDoById(req, res, next) {
    const todo = await ToDo.findByPk(req.params.id);
    if (!todo) {
        throw new ErrorResponse('No todo found', 404);
    }
    await todo.destroy();

    res.status(200).json(todo);
}
async function deleteToDos(req, res, next) {
    await ToDo.destroy({
        truncate: true
    });
    res.status(200).json({ message: 'OK' });
}
async function patchToDos(req, res, next) {
    let todo = await ToDo.findByPk(req.params.id);

    if (!todo) {
        throw new ErrorResponse('No todo found', 404);
    }
    //const id = req.params.index;
    await todo.update(req.body);
    res.status(200).json({ message: "OK" });
}

initRoutes();

module.exports = router;