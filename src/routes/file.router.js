
const express = require('express');
const upload = require('../utils/multer');
const { getAll, create, remove, getOne } = require('../controllers/file.controller');

const routerFile = express.Router();

routerFile.route('/')
    .get(getAll)
    .post(upload.single('file'), create)

    routerFile.route('/:id')
    .delete(remove)
    .get(getOne)


module.exports = routerFile;