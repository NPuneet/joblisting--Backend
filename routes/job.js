const express = require("express");
const JobRouter = express.Router();
const job = require("../models/job");
const verifyToken = require("../middleware/authMiddleware");
const {
  createJob,
  editJob,
  getJob,
  getAllJobs,
} = require("../controllers/job");

JobRouter.post("/create", verifyToken, createJob);

JobRouter.put("/edit/:jobId", verifyToken, editJob);

JobRouter.get("/details/:jobId", getJob);
JobRouter.get("/all-jobs", getAllJobs);

module.exports = JobRouter;
