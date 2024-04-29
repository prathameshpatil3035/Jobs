const jobPosted = require("../model/jobPosted");

const postJob = async (req, res) => {
  try {
    const body = req.body;
    const resp = await jobPosted.create(body);
    res.status(200).json({ job: resp });
  } catch (error) {
    res.send(400).json({ msg: "something went wrong" });
  }
};

const getJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = jobPosted.findOne({ id: id });
    res.status(200).json({ job });
  } catch (error) {
    res.send(400).json({ msg: "something went wrong" });
  }
};

const getJobs = async (req, res) => {
  try {
    const currentDate = Date.now();
    const tooLast = new Date(new Date().setDate(currentDate.getDate() - 21));
    const midDate = new Date(new Date().setDate(currentDate.getDate() - 14));
    const latestDate = new Date(new Date().setDate(currentDate.getDate() - 3));

    const greenJob = jobPosted.findAll({
      created_at: { $lt: tooLast },
    });
    const yellowJob = jobPosted.findAll({
      created_at: { $gte: tooLast, $lt: midDate },
    });
    const redJob = jobPosted.findAll({
      created_at: { $gte: latestDate, $lt: currentDate },
    });
    res.status(200).json({ greenJob, yellowJob, redJob });
  } catch (error) {
    res.send(400).json({ msg: "something went wrong" });
  }
};

module.exports = {
  postJob,
  getJob,
  getJobs,
};
