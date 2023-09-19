const express = require('express');
const controller = require('../controllers/import');
const router = express();

const multer = require('multer');
const multerConfig = require('../../config/multer').config;
const uploadArchive = require('../middlewares/uploadArchive');

// POST /import/run -> Run import
router.post('/run', controller.run);

// POST /import -> upload import archive
router.post('/', multer(multerConfig).single('file'), uploadArchive.checkUploadArchive,controller.run);

// GET /export/{instance} -> List exports by instance
// router.get('/:instance', controller.listByInstance);
// // GET /export/{instance}/{iteration} -> Get import archive by instance and iteration
// router.get('/:instance/:iteration', controller.getDownloadURLFromInstanceAndIteration);

module.exports = router;