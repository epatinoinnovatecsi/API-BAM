const express = require('express');
const routerUser = require('./user.router');
const routerActivity = require('./activity.router');
const routerFile = require('./file.router');
const routerAdmin = require('./admin.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/admins', routerAdmin)
router.use('/users', routerUser);
router.use('/activities', routerActivity);
router.use('/update?', routerFile);


module.exports = router;