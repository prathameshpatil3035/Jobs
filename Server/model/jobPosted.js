const mongoose = require("mongoose");

const job_posted_schema = new mongoose.Schema({
  title: { type: String, require: true },
  description: String,
  location: { type: String, required: true },
  deadline: { type: Date, set: (d) => new Date(d * 1000) },
  phone_number: {
    type: Number,
    required: true,
  },
  contact_email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
    required: [true, "Email required"],
  },
  user_posted_id: {
    type: Number,
    required: true,
  },
  posted_at: {
    type: Date,
    required: true,
    set: (d) => new Date(d * 1000),
  },
});

module.exports = mongoose.model("job_posted", job_posted_schema);
