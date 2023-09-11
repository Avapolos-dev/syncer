const service = require('../services/import');
const serviceMulter = require('../services/multer');

/**
 * @param  {import('express').Request} req
 * @param  {import('express').Response} res
 */
const run = async (req, res) => {
  await service.run();
  res.sendStatus(200);
};

const uploadArchive = () => {
  return serviceMulter.importUploader.single('file');
};

/**
 * @param  {import('express').Request} req
 * @param  {import('express').Response} res
 */
const checkUploadArchive = async (req, res) => {
  console.log('Arquivo recebido',req.file);

  if (!req.file) 
    return res.status(400).json({ success: false, message: 'you need to provide an import archive.'});
  await serviceMulter.putUploadToMinio(req)
  return res.status(200).json({ success: true, message: 'Success.'});
};

module.exports = {
  run,
  uploadArchive,
  checkUploadArchive,
};
