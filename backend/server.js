const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
require("./src/config/db.config");
const user = require('./src/routes/userRoutes');
const { internal_server_error } = require("./src/utils/commonResponse");
const cors = require("cors");
app.use("/media", express.static("./public/uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());

app.use('/', user);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  return internal_server_error(res, err.message);
});
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
