const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./src/routes");
const errorHandler = require("./src/utils/middlewares/errorHandlers");
const setHeaders = require("./src/utils/middlewares/setHandlers");
const { conn } = require("./src/models/db");
const { portServer } = require("./src/utils/config/");
const server = express();

// ! MIDDLEWARE CORS
server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use(setHeaders);

// ! SETTINGS ROUTES
server.use("/", routes);

// ! MIDDLEWARE CONTROL-ERRORS
server.use(errorHandler);

conn.sync({ force: true }).then(() => {
  server.listen(portServer, () => {
    console.log("DATABASE CONNECTED!");
    console.log(`%s listening at ${portServer}`);
  });
});
