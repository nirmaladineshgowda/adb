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

// 1. Get Larget Earthquakes by magnitude.
app.post('/getEarthQuakesByMagnitude', (req, res) => {
    let noOfEarthQuakes = req.body.noOfEarthQuakes;
    let sqlQuery = `Select Top ${noOfEarthQuakes} * from data where type = 'earthquake' and mag is not null order by mag desc`;
    getResult(sqlQuery);
});

// 2. Get Quakes within the range
app.post('/getQuakesInRange', (req, res) => {
    let lat = req.body.lat;
    let lon = req.body.lon;
    let range = req.body.range;
    let sqlQuery = `SELECT id,latitude,longitude,MAG,(6371*acos(cos(radians(${lat}))* cos(radians(latitude))* cos(radians(longitude) 
    - radians(${lon}))+ sin(radians(${lat}))*sin(radians(latitude)))) AS distance FROM data where (6371*acos(cos(radians(${lat}))* 
    cos(radians(latitude))* cos(radians(longitude) - radians(${lon}))+ sin(radians(${lat}))*sin(radians(latitude)))) < ${range}
     order by mag desc;`;
    getResult(sqlQuery);
});

// 3. Get Quakes within the date range and Magnitude. 
app.post('/getQuakesInDateRange', (req, res) => {
    let mag = req.body.mag;
    let fromDate = req.body.fromDate;
    let toDate = req.body.toDate;
    let sqlQuery = `select * from data where mag<${mag} and VARCHAR_FORMAT(time,'YYYY-MM-DD') between '${fromDate}' and '${toDate}'`;
    getResult(sqlQuery);
});

// 4. Count By Magnitude. 
app.post('/getQuakesCountByMagnitude', (req, res) => {
    let dat = req.body.Day;
    let sqlQuery = `SELECT count(RANGE) as COUNT, range FROM  (select t.*, (case when t.mag between 0 and 1  then '0-1' when t.mag between 1 and 2 then '1-2' when t.mag between 2 and 3 then '2-3' when t.mag between 3 and 4 then '3-4' when t.mag between 4 and 5 then '4-5' when t.mag between 5 and 6 then '5-6' when t.mag between 6 and 7 then '6-7'  end) as range from MCP95677.NEWEARTH t where VARCHAR_FORMAT(time,'YYYY-MM-DD') >VARCHAR_FORMAT(sysdate-${dat},'YYYY-MM-DD')) group by range;`;
    getResult(sqlQuery);
});

// 5. Get Quakes within the date range and Magnitude. 
app.post('/getQuakesInDateRange', (req, res) => {
    var loc_lat1 = req.body.lat1;
    var loc_lon1 = req.body.lon1;
    var loc_lat2 = req.body.lat2;
    var loc_lon2 = req.body.lon2;
    var range = req.body.ran;
    let sqlQuery = `SELECT count(distinct l1.id),count(distinct l2.id) FROM MCP95677.NEWEARTH l1,MCP95677.NEWEARTH l2 where 
    (6371*acos(cos(radians(${loc_lat1}))* 
    cos(radians(l1.latitude))* 
    cos(radians(l1.longitude) - 
    radians(${loc_lon1}))+ 
    sin(radians(${loc_lat1}))*
    sin(radians(l1.latitude)))) < ${range}
    and (6371*acos(cos(radians(${loc_lat2}))* 
    cos(radians(l2.latitude))* 
    cos(radians(l2.longitude) - 
    radians(${loc_lon2}))+ 
    sin(radians(${loc_lat2}))*
    sin(radians(l2.latitude)))) < ${range};`;
    getResult(sqlQuery);
});

function getResult(sqlQuery) {
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