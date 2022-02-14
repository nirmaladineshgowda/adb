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
    res.send('Hello World!!!');
});

app.post('/searchnamekeydb', (req, res) => {
    var name = req.body.Name;
    var value = req.body.Value;
    var sql = `SELECT TOP 20 * FROM [details]`;
    // Read all rows from table
    const request = new Request(sql,
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

    request.on('done', (rowCount) => {
        console.log('Done is called!');
        res.send(rows);
      });
    
    request.on('doneInProc', (rowCount, more) => {
        console.log(rowCount + ' rows returned');
        res.send(rows);
    });
   connection.execSql(request);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});