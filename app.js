require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routers/index.js");
const cors = require("cors");
const PORT = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

app.listen(PORT, function () {
  console.log(`listenin on ` + PORT);
});
