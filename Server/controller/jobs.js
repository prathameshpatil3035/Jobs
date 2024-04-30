const JobPosted = require("../model/jobPosted");
const mongoose = require("mongoose");

const postJob = async (req, res) => {
  try {
    const body = req.body;
    if (!mongoose.Types.ObjectId.isValid(body.user_posted)) {
      return res.status(400).json({ msg: "Invalid user_posted ID" });
    }

    const jobData = {
      title: body.title,
      description: body.description,
      location: body.location,
      deadline: new Date(body.deadline * 1000),
      user_posted: body.user_posted,
      posted_at: new Date(body.posted_at),
    };
    const newJob = await JobPosted.create(jobData);
    res.status(200).json({ job: newJob });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Something went wrong" });
  }
};
const getJob = async (req, res) => {
  try {
    const { job_id: id } = req.params;
    const job = await JobPosted.findOne({ _id: id });

    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    res.status(200).json({ job });
  } catch (error) {
    res.send(400).json({ msg: "something went wrong" });
  }
};

const getJobs = async (req, res) => {
  try {
    const currentDate = new Date();
    const twentyOneDaysAgo = new Date(
      currentDate.getTime() - 21 * 24 * 60 * 60 * 1000
    );
    const fourteenDaysAgo = new Date(
      currentDate.getTime() - 14 * 24 * 60 * 60 * 1000
    );
    const threeDaysAgo = new Date(
      currentDate.getTime() - 3 * 24 * 60 * 60 * 1000
    );

    const groupedJobs = await JobPosted.aggregate([
      {
        $group: {
          _id: {
            $cond: [
              { $gte: ["$posted_at", threeDaysAgo] },
              "last_3_days",
              {
                $cond: [
                  {
                    $and: [
                      { $gte: ["$posted_at", fourteenDaysAgo] },
                      { $lt: ["$posted_at", threeDaysAgo] },
                    ],
                  },
                  "3_to_14_days",
                  {
                    $cond: [
                      {
                        $and: [
                          { $gte: ["$posted_at", twentyOneDaysAgo] },
                          { $lt: ["$posted_at", fourteenDaysAgo] },
                        ],
                      },
                      "14_to_21_days",
                      "more_than_21_days",
                    ],
                  },
                ],
              },
            ],
          },
          jobs: { $push: "$$ROOT" },
        },
      },
    ]);

    res.status(200).json({ groupedJobs });
  } catch (error) {
    res.send(400).json({ msg: "something went wrong" });
  }
};

const softDeleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ msg: "Invalid jobId" });
    }

    const updatedJob = await JobPosted.findByIdAndUpdate(
      jobId,
      { is_deleted: true },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ msg: "Job not found" });
    }

    res
      .status(200)
      .json({ msg: "Job soft deleted successfully", job: updatedJob });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Something went wrong" });
  }
};

module.exports = {
  postJob,
  getJob,
  getJobs,
  softDeleteJob,
};
