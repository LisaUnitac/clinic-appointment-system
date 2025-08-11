require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

// Routes
app.use("/users", require("./routes/userRoutes"));
app.use("/doctors", require("./routes/doctorRoutes"));
app.use("/appointments", require("./routes/appointmentRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
