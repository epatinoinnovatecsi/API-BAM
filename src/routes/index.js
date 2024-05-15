const express = require('express');
const routerUser = require('./user.router');
const routerActivity = require('./activity.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', routerUser);
router.use('/activities', routerActivity)


module.exports = router;