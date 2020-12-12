const express = require("express");
const app = express();
const routers = require("./routers");

app.get("/", function (req, res) {
  res.json("CL Serve Project");
});

app.use(routers.authRouter);
app.use(routers.userRouter);
app.use(routers.projectRouter);
app.use(routers.referencesRouter);
app.use(routers.personalInformationRouter);

app.use((req, res, next) => {
  res.send("404 NOT FOUND");
});

module.exports = app;
