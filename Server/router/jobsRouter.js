const express = require("express");
const router = express.Router();
const {
  postJob,
  getJob,
  getJobs,
  softDeleteJob,
} = require("../controller/jobs");
const {
  addInterest,
  getInterestByJobId,
} = require("../controller/interestedInJob");

//GET
router.route("/:job_id").get(getJob);
router.route("/").get(getJobs);
router.route("/interested-users/:jobId").get(getInterestByJobId);

//POST
router.route("/").post(postJob);
router.route("/add/interest").post(addInterest);

//PUT
router.route("/delete/:jobId").put(softDeleteJob);

module.exports = router;
