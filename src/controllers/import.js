const service = require('../services/import');


/**
 * @param  {import('express').Request} req
 * @param  {import('express').Response} res
 */
const run = async (req, res) => {
  const {bucket, name, path} = req.fileInMinio;
  await service.run(bucket, name, path);
  res.sendStatus(200);
};


module.exports = {
  run,
};
