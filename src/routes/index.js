const express = require('express');

const exportRoutes = require('./export');
const importRoutes = require('./import');
const loginRoutes = require('./login');

const authMiddleware = require('../middlewares/auth');

const rootRouter = express();

rootRouter.use('/export', authMiddleware.format, authMiddleware.valid,exportRoutes);
rootRouter.use('/import',authMiddleware.format,authMiddleware.valid, importRoutes);
rootRouter.use('/login', loginRoutes)

module.exports = rootRouter;
