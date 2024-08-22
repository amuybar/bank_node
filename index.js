const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const userRoute = require("./routes/user_routes");
const baseRoutes = require('./routes/base_routes');


const app = express();

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to Database'))
    .catch((err) => console.error(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', baseRoutes);
app.use("/api/auth", userRoute);


app.listen(PORT,()=>console.log(`Server is running at port ${PORT}`))