const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const authRoutes = require("./server/router/Auth.js");
const mediaRouter = require("./server/router/Media");
const userRouter = require("./server/router/User");
// const webpush = require("web-push");
// const subscribeRouter = require("./server/router/Subscribe");
// const path = require("path");
const app = express();

// app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// const publicVapidKey = "BMIduzT1FU-quw3-EHg3gJrxHIWULgPZpJo26OLBXGAxdz6zLVxck5P3WfojOH_yuzniJdm37b3j9riDL8MD1qs";
// const { privateVapidKey } = process.env;

// webpush.setVapidDetails("mailto:test@test.com", publicVapidKey, privateVapidKey);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "*");
  // res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,UPDATE,OPTIONS");
  next();
});

app.use("/auth", authRoutes);
app.use("/media", mediaRouter);
app.use("/user", userRouter);
// app.use("/subscribe", subscribeRouter);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});