const express = require("express");
const job = require("../models/job");
const createJob = async (req, res, next) => {
  try {
    const {
      companyName,
      logoUrl,
      jobPosition,
      montlySalary,
      jobType,
      remoteOffice,
      locationType,
      jobDescription,
      aboutCompany,
      skillsRequired,
      additionalInformation,
      duration,
    } = req.body;
    if (
      !companyName ||
      !logoUrl ||
      !jobPosition ||
      !montlySalary ||
      !jobType ||
      !remoteOffice ||
      !locationType ||
      !jobDescription ||
      !aboutCompany ||
      !skillsRequired ||
      !additionalInformation ||
      !duration
    ) {
      res.status(404).json({ message: "details missing" });
    }
    const jobDetails = new job({
      companyName,
      logoUrl,
      jobPosition,
      montlySalary,
      jobType,
      remoteOffice,
      locationType,
      jobDescription,
      aboutCompany,
      skillsRequired,
      additionalInformation,
      duration,
    });
    await jobDetails.save();
    res.status(200).json({ message: "job created successfully" });
  } catch (error) {
    next(error);
  }
};
const editJob = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    const {
      companyName,
      logoUrl,
      jobPosition,
      montlySalary,
      jobType,
      remoteOffice,
      locationType,
      jobDescription,
      aboutCompany,
      skillsRequired,
      additionalInformation,
      duration,
    } = req.body;
    if (
      !companyName ||
      !logoUrl ||
      !jobPosition ||
      !montlySalary ||
      !jobType ||
      !remoteOffice ||
      !locationType ||
      !jobDescription ||
      !aboutCompany ||
      !skillsRequired ||
      !additionalInformation ||
      !duration
    ) {
      res.status(404).json({ message: "details missing" });
    }

    await job.updateOne(
      { _id: jobId },
      {
        $set: {
          companyName,
          logoUrl,
          jobPosition,
          montlySalary,
          jobType,
          remoteOffice,
          locationType,
          jobDescription,
          aboutCompany,
          skillsRequired,
          additionalInformation,
          duration,
        },
      }
    );

    res.json({ message: "Job details updated" });
  } catch (error) {
    next(error);
  }
};
const getJob = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    if (!jobId) {
      return res.status(400).json({ errorMessage: "Bad Request" });
    }
    const jobDetails = await job.findById(jobId);
    res.json({ data: jobDetails });
  } catch (error) {
    next(error);
  }
};

const getAllJobs = async (req, res, next) => {
  try {
    const jobDescription = req.query.jobDescription || "";
    const skills = req.query.skills;
    const jobList = await job.find(
      { jobDescription: { $regex: jobDescription, $options: "i" } },
      { jobDescription: 1, montlySalary: 1, logoUrl: 1, locationType: 1 }
    );
    res.status(200).json({ data: jobList });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createJob,
  editJob,
  getJob,
  getAllJobs,
};
