const compressing = require('compressing');
const config = require('../config')
const fs = require('fs-extra');
const { nanoid } = require('nanoid');
const { Pool } = require("pg");
const objstore = require('./objstore')
const container = require('./container');

const { client:db, waitForHealthy } = require('../db');

const getLastImport = async() => {
  const sql = `SELECT max(iteration) FROM avapolos_sync WHERE instance='${config.instance}' AND operation='I'`;
  const result = (await db.query(sql)).rows[0].max;

  if (!result) return 0
  return result
}

const getNextImport = async() => {
  const lastImport = await getLastImport()
  return lastImport + 1;
}

const createControlRecord = async(iteration) => {
  const sql = `INSERT INTO avapolos_sync(instance,iteration,operation) VALUES ('${config.instance}', '${iteration}', 'I')`;
  await db.query(sql)
}

const run = async (bucket, importName, path) => {
  const nextImport = await getNextImport()

  const tmpPath = `/tmp/avapolos_syncer/${nanoid(8)}`;
  const tmpImportPath = `${tmpPath}/import.tgz`;
  const tmpImportDataPath = `${tmpPath}/import`;
  const syncDataPath = await container.getVolumeMountpointByContainer(config.replication.sync, "/var/lib/postgresql/data");
  const moodledataFiledirPath = `${await container.getVolumeMountpointByContainer('moodle', "/app/moodledata")}/filedir`;

  // const nextImport = 50
  //console.log(`next iteration: ${nextImport}`)

  if (! await objstore.has(bucket, importName)) throw new Error('import archive was not found');


  await objstore.get(bucket, importName, tmpImportPath);
  await compressing.tgz.uncompress(tmpImportPath, tmpImportDataPath);
  
  console.log(`${tmpImportDataPath}/database`)
  console.log(syncDataPath)
  
  // Apaga o diretorio de dados do container de sincronização
  await fs.rmdir(syncDataPath, { recursive: true });
  // NÃO copia os dados para o diretorio, apresenta erro nessa etapa (Não sei o motivo)
  fs.copy(`${tmpImportDataPath}/database`, syncDataPath, { recursive: true });


  await container.stop(config.replication.main);
  await container.start(config.replication.sync);
  await container.start(config.replication.main);


  await waitForHealthy(async () => {
    await db.query("SELECT bdr.wait_slot_confirm_lsn(NULL, NULL)");
    console.log('stopping sync db')
    container.stop(config.replication.sync);
    return;
  })

  await createControlRecord(nextImport);

  await container.runCommand('moodle', ["php",  "/app/public/admin/cli/purge_caches.php"])
  await container.restart('moodle');
}

module.exports = {
  run
};
