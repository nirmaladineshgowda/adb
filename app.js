const express = require("express");
const cors = require('cors');
const bodyparser = require("body-parser");
const connection = require("./connection");
const { Request } = require("tedious");

var app = express();
app.use(bodyparser.json());
app.use(cors({ origin: '*' }));

// Default Route
app.get('/', (req, res) => {
    res.send('Hello World Quiz!!!');
});


// 1. Get Larget Earthquakes by magnitude.
app.post('/getQuakesByMagRange', (req, res) => {
    let magRange1 = req.body.magRange1;
    let magRange2 = req.body.magRange2;

    let sqlQuery = `Select * from eq where mag >= ${magRange1} and mag <= ${magRange2}`;
    getResult(sqlQuery, res);
});



// 10
app.post('/getQuakesByDegrees', (req, res) => {
    let lat = req.body.lat;
    let lon = req.body.lon;
    let N = req.body.N;

    let sqlQuery = `Select * from eq where lattitude >= ${lat - N} and lattitude <= ${lat + N} and longitude >= ${lon - N} and longitude <= ${lon + N}`;
    getResult(sqlQuery, res);
});

// 1. Get Larget Earthquakes by magnitude.
app.post('/getQuakesByTypeAndNet', (req, res) => {
    let type = req.body.type;
    let net = req.body.net;

    let sqlQuery = `Select * from eq where type = ${type} and net = ${net}`;
    getResult(sqlQuery, res);
});



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
        res.send(rows);
    });
   connection.execSql(request);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});