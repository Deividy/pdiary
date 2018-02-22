const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

process.env.TZ = 'UTC';

const express = require('express');
const app = express();

require('./routes')(app);

app.listen(process.env.HTTP_PORT, () => {
    console.log(`It's alive! http://localhost:${process.env.HTTP_PORT}`);
});
