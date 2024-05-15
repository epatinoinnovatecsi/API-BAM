const { create, getById } = require('../controllers/activity.controller');
const express = require('express');

const routerActivity = express.Router();

routerActivity.route('/')
    .post(create);

routerActivity.route('/:id')
    .get(getById)

module.exports = routerActivity;