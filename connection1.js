const { Connection, Request } = require("tedious");

// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "nirmaladinesh",
      password: "7411671120@Nir"
    },
    type: "default"
  },
  server: "samplenir.database.windows.net",
  options: {
    database: "ndgdb",
    encrypt: true
  }
};


const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
  }
});

connection.connect();
module.exports = connection;
