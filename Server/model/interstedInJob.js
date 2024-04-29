const mongoose = require("mongoose");

const interested_in_job_schema = new mongoose.Schema({
  jobs_id: { type: Number, required: true },
  user: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("interested_in_job", interested_in_job_schema);
