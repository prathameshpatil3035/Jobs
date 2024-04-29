const express = require("express");
const router = express.Router();
const { postJob, getJob, getJobs } = require("../controller/jobs");

//GET
router.route("/:job_id").get(getJob);
router.route("/").get(getJobs);

//POST
router.route("/").post(postJob);

module.exports = router;
