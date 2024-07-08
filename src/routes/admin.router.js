const { getAll, create, getOne, remove, update, login } = require('../controllers/admin.controller');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');

const routerAdmin = express.Router();

routerAdmin.route('/')
    .get(verifyJwt, getAll)
    .post(create);

routerAdmin.route('/login')
    .post(login)

routerAdmin.route('/:id')
    .get(verifyJwt, getOne)
    .delete(verifyJwt, remove)
    .put(verifyJwt, update);

module.exports = routerAdmin;