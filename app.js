const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const expressSession = require("express-session");

const db = require("./config/db-Connection");
const indexRouter = require("./routes/index");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");


require("dotenv").config("/env");

app.use(flash());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      secret: process.env.EXPRESS_SESSION_SECRETE,
    })
  );


app.use("/", indexRouter )
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000);
