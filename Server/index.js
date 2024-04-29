const express = require("express");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();
const jobsRouter = require("./router/jobsRouter");
//middlewares
app.use(express.json());

app.use("/api/v1/jobs", jobsRouter);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
