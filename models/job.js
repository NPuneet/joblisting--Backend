const { default: mongoose } = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    logoUrl: {
      type: String,
      required: true,
    },
    jobPosition: {
      type: String,
      required: true,
    },
    montlySalary: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    remoteOffice: {
      type: String,
      required: true,
    },
    locationType: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    aboutCompany: {
      type: String,
      required: true,
    },
    skillsRequired: {
      type: String,
      required: true,
    },
    additionalInformation: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Job", jobSchema);
