const Minio = require('minio')
const config = require('../config')

// Instantiate the minio client with the endpoint
// and access keys as shown below.
const minio = new Minio.Client({
  endPoint: config.minio.host,
  port: 9000,
  useSSL: false,
  accessKey: config.minio.key,
  secretKey: config.minio.secret
});

const makeBucketIfNotExists = async (name) => {
  const exists = await minio.bucketExists(name)
  if (!exists) await minio.makeBucket(name)
}

const put = async (bucket, name, path) => {
  await makeBucketIfNotExists(bucket)
  return await minio.fPutObject(bucket, name, path)
}

const get = async (bucket, name, path) => {
  return await minio.fGetObject(bucket, name, path)
}

// Colocar o content-type

module.exports = {
  put,
  get
}