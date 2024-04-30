const mongoose = require("mongoose");

const job_posted_schema = new mongoose.Schema({
  name: { type: String, required: true },
  phone_number: { type: Number, required: true },
  contact_emil: {
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
});

module.exports = mongoose.model("job_posted", job_posted_schema);
