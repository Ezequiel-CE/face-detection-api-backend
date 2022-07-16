const express = require("express");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();

const app = express();

//imports

const db = require("./src/config/database");
const User = require("./src/models/User.model");
const authRouter = require("./src/routes/auth");

//middleware
app.use(express.json());
app.use(passport.initialize());
app.use(cors());

//routes

app.use("/api/auth", authRouter);

const initServer = async () => {
  try {
    await db.authenticate();

    await User.sync();

    app.listen(4000, console.log("started on port 4000"));
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

initServer();
