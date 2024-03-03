const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/auth");
const JobRouter = require("./routes/job");
const errorHandling = require("./middleware/errorHandlingMiddleware");
const app = express();
const dotenv = require("dotenv").config();
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Db connected");
  })
  .catch((err) => {
    console.log("Db failed to connect", err);
  });

app.use(express.json());
app.use("/api/v1/auth", router);
app.use("/api/v1/job", JobRouter);
app.get("/health", (req, res) => {
  return res.json({
    status: true,
    service: "Job listing Backend API",
    time: new Date(),
  });
});
app.use("/*", (req, res) => {
  res.status(404).json({ message: "invalid route" });
});

app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`server started at http://${HOST}:${PORT}`);
});
