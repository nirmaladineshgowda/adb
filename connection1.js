const { Connection } = require("tedious-async");

// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "Manoj123",
      password: "Manoj@123"
    },
    type: "default"
  },
  server: "adbquiz3.database.windows.net",
  options: {
    database: "adbquiz3",
    encrypt: true
  }
};

const connection = new Connection(config);
// async function connectToDB() {
//     connection.connect();
//     const onConnectResult = await connection.onConnectAsync();
// }
// connectToDB();
module.exports = connection;