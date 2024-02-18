const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
// app.use((req, res) => {
//   console.log(req.path);
// });
app.use(cors());
app.use(express.json());

// Routes
const { authRoutes } = require("./routes");

app.use("/api", authRoutes);

app.use((err, req, res, next) => {
  return res.status(400).json({ error: err.message });
});

module.exports = app;
