const mongoose = require("mongoose");

const interested_in_job_schema = new mongoose.Schema({
  jobs_id: { type: String, required: true },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

module.exports = mongoose.model("interested_in_job", interested_in_job_schema);
