const express = require('express');
const routerUser = require('./user.router');
const routerActivity = require('./activity.router');
const routerFile = require('./file.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', routerUser);
router.use('/activities', routerActivity);
router.use('/files', routerFile);


module.exports = router;