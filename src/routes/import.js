const express = require('express');
const controller = require('../controllers/import');
const service  = require('../services/multer');

const router = express();

// POST /import/run -> Run import
router.post('/run', controller.run);

// POST /import -> upload import archive
router.post('/', controller.uploadArchive('archive'), controller.checkUploadArchive);

// GET /export/{instance} -> List exports by instance
// router.get('/:instance', controller.listByInstance);
// // GET /export/{instance}/{iteration} -> Get import archive by instance and iteration
// router.get('/:instance/:iteration', controller.getDownloadURLFromInstanceAndIteration);

module.exports = router;