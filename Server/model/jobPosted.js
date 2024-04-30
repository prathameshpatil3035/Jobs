const mongoose = require("mongoose");

const job_posted_schema = new mongoose.Schema({
  title: { type: String, require: true },
  description: String,
  location: { type: String, required: true },
  deadline: { type: Date, set: (d) => new Date(d * 1000) },
  user_posted: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  posted_at: {
    type: Date,
    required: true,
    set: (d) => new Date(d * 1000),
  },
  is_deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("job_posted", job_posted_schema);
