const express = require("express");
const cors = require('cors');
const bodyparser = require("body-parser");
const connection = require("./connection");
const { Request } = require("tedious");
let redis = require("redis");
let crypto = require('crypto');

var app = express();
app.use(bodyparser.json());
app.use(cors({ origin: '*' }));
let startTime;
// Connect to the Azure Cache for Redis over the TLS port using the key.
let cacheHostName = "ADB3Cache.redis.cache.windows.net"; // process.env.REDISCACHEHOSTNAME;
let cachePassword = "QSYcOioy2aSLSmSotxPnHxPWhEHkN2fi2AzCaIsFbL0="; // process.env.REDISCACHEKEY;
let cacheConnection = redis.createClient({
    // rediss for TLS
    url: "rediss://" + cacheHostName + ":6380",
    password: cachePassword,
});
cacheConnection.connect();

// Default Route
app.get('/', (req, res) => {
    res.send('Hello World Quiz!!!');
});

// Default Route
app.get('/flush', (req, res) => {
    cacheConnection.FLUSHALL();
    res.send('Hello World Quiz!!!');
});

// 1. Get Larget Earthquakes by magnitude.
app.post('/getQuakesByMagRange', (req, res) => {
    let magRange1 = req.body.magRange1;
    let magRange2 = req.body.magRange2;

    let sqlQuery = `Select * from eq where mag>= ${magRange1} and mag <= ${magRange2}`;
    checkRedisAndGet(sqlQuery, res);
});

async function checkRedisAndGet(sql, res) {
    startTime = new Date();
    let hash = crypto.createHash('md5').update(sql).digest('hex');
    let key = "redis_cache:" + hash;
    let data = await cacheConnection.get(key);
    if (!data) {
        getResult(sql, res);
    } else {
        let timeElapsed = (new Date()) - startTime;
        res.send({  time: timeElapsed, data: JSON.parse(data) });
    }
}

function getResult(sqlQuery, res) {
    const request = new Request(sqlQuery,
        (err, rowCount) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`${rowCount} row(s) returned`);
            }
        }
    );
    const rows = [];
    request.on("row", columns => {
        let row = {};
        columns.forEach((column) => {
            row[column.metadata.colName] = column.value;
        });
        rows.push(row);
    });

    request.on('doneInProc', (rowCount, more) => {
        console.log(rowCount + ' rows returned');
        let hash = crypto.createHash('md5').update(sqlQuery).digest('hex');
        let key = "redis_cache:" + hash;
        let parsedResult = JSON.stringify(rows);
        cacheConnection.set(key, parsedResult);
        let timeElapsed = (new Date()) - startTime;
        res.send({ time: timeElapsed, data: rows });
    });
    connection.execSql(request);
}


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});