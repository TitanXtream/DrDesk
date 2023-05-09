const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");
require("dotenv").config();
//mongodb
connectDB();
// rest object
const app = express();
//middleware
app.use(express.json());
app.use(morgan("dev"));
//routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  // Callback
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgGreen.white
  );
});
