const multer = require('multer');
const { nanoid } = require('nanoid');
const fs = require('fs-extra');
const objstore = require('./objstore')
const config = require('../config')


const importStreamUploader = multer({storage: multer.memoryStorage()});

const importUploader = multer({storage: multer.diskStorage({
  destination: (req, file, cb) => {
    const path = `/tmp/import/${nanoid(8)}`
    fs.mkdirSync(path, {recursive: true})
    cb(null, path)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }})
});

const putStreamUploadToMinio = async (req) => {
  await objstore.putStream(config.minio.importsBucket, req.file.originalname, req.file.buffer);
};

const putUploadToMinio = async (req) => {
  await objstore.put(config.minio.importsBucket, req.file.filename, req.file.path);
  console.log(req.file.destination);
  await fs.unlink(req.file.path);
  await fs.rmdir('/tmp/import', {recursive: true});
};

module.exports = {
  importStreamUploader,
  importUploader,
  putStreamUploadToMinio,
  putUploadToMinio
};