const fs = require('fs-extra');
const objstore = require('../services/objstore');
const config = require('../config')


const putStreamUploadToMinio = async (req) => {
  await objstore.putStream(config.minio.importsBucket, req.file.originalname, req.file.buffer);
};

// Por que PUT e não POST?
const putUploadToMinio = async (req) => {
  await objstore.put(config.minio.importsBucket, req.file.filename, req.file.path);
  await fs.unlink(req.file.path);
  await fs.rmdir('/tmp/import', {recursive: true});

  return {
    bucket: config.minio.importsBucket,
    name: req.file.filename,
    path: req.file.path,
  }
};

 // está checando a requisição apenas, não o diretorio do servidor (É necessário chegar o servidor?)
const checkUploadArchive = async (req, res, next) => {
 
  if (!req.file) 
    return res.status(400).json({ success: false, message: 'you need to provide an import archive.'});
  const fileInMinio = await putUploadToMinio(req)
  req.fileInMinio = fileInMinio;
  return next();
};

module.exports = {
  checkUploadArchive,
};