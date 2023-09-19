const multer = require('multer');
const { nanoid } = require('nanoid');
const fs = require('fs-extra');
const path = require('path');


exports.config = {
  fileFilter: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    if (fileExtension === '.tgz') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  },
  storage:  multer.diskStorage({
    destination: (req, file, cb) => {
      const path = `/tmp/import/${nanoid(8)}`
      fs.mkdirSync(path, {recursive: true})
      cb(null, path)
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }})
};