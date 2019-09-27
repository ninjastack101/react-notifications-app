const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require("cors");

require("./model/subscribers_model");

const index = require("./router");
const push = require("./router/push");
const subscribe = require("./router/subscribe");
const keys = require("./config/keys");

mongoose.Promise = global.Promise;

mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const app = express();
app.set("trust proxy", true);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use("/", index);
app.use("/subscribe", subscribe);
app.use("/push", push);

app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.json({ error: err });
  });
}

app.use(function(err, req, res, next) {
  res.json({ error: err });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
