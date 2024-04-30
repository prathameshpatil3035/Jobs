const mongoose = require("mongoose");
const JobPosted = require("../model/jobPosted");
const InterestedInJob = require("../model/interstedInJob");

const addInterest = async (req, res) => {
  try {
    const { jobId, userIds } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(jobId) ||
      !Array.isArray(userIds) ||
      userIds.some((id) => !mongoose.Types.ObjectId.isValid(id))
    ) {
      return res.status(400).json({ msg: "Invalid jobId or userId" });
    }

    const job = await JobPosted.findById(jobId);
    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    let interestEntry = await InterestedInJob.findOne({ jobs_id: jobId });

    if (!interestEntry) {
      interestEntry = new InterestedInJob({
        jobs_id: jobId,
        user: userIds,
      });
    } else {
      userIds.forEach((id) => {
        if (!interestEntry.user.includes(id)) {
          interestEntry.user.push(id);
        }
      });
    }

    await interestEntry.save();

    res.status(200).json({ msg: "Interest added successfully", interestEntry });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Something went wrong" });
  }
};

const getInterestByJobId = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Check if the jobId is a valid ObjectId string
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ msg: "Invalid jobId" });
    }

    // Find interest entries for the provided job ID
    const interestEntries = await InterestedInJob.find({ jobs_id: jobId });

    res.status(200).json({ interestEntries });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Something went wrong" });
  }
};

module.exports = { addInterest, getInterestByJobId };
