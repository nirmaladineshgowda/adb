const { Connection, Request } = require("tedious");

// Create connection to database
// const config = {
//   authentication: {
//     options: {
//       userName: "manoj619",
//       password: "Manoj123"
//     },
//     type: "default"
//   },
//   server: "adbassignmentdemo.database.windows.net",
//   options: {
//     database: "adbassignment",
//     encrypt: true
//   }
// };

// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "sqluser",
      password: "Xmzz8b8tyFDR$Rg"
    },
    type: "default"
  },
  server: "adb-student.database.windows.net",
  options: {
    database: "Assignment1",
    encrypt: true
  }
};

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    // queryDatabase();
  }
});

connection.connect();

function queryDatabase() {
  console.log("Reading rows from the Table...");

  // Read all rows from table
  const request = new Request(
    `SELECT TOP 20 Name
     FROM [details]`,
    (err, rowCount) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`${rowCount} row(s) returned`);
      }
    }
  );

  request.on("row", columns => {
    columns.forEach(column => {
      console.log("%s\t%s", column.metadata.colName, column.value);
    });
  });

  connection.execSql(request);
}
module.exports = connection;