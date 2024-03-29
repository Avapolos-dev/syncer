const express = require('express');
const helmet = require('helmet');

const app = express();
const config = require('./config');
const routes = require('./routes');
const db = require('./db');
const cors = require("cors");
const path = require('path');

app.use(express.static(path.join(__dirname,'public')));

app.use(cors());

app.use(express.json())
app.use(helmet());

app.use(routes);

const _main = async () => {
  await db.init()
  const server = app.listen(config.port, () => {
    console.log(`listening on port: ${config.port}`)
  })
}

_main();
