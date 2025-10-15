require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const router = require("./src/routes");
const errorHandler = require("./src/middlewares/errorHandler");
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
