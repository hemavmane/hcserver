const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
const cors = require("cors")
const Razorpay = require("razorpay")
const crypto = require("crypto");
require('dotenv').config(); 

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected succesfully");
  })
  .catch(er => {
    console.log(er, "failed to connect database");
  });




/// middelware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("Public"));
app.use(express.urlencoded({ extended: true }));



const Admin = require("./Router/auth");
const contactus = require("./Router/contact");
const Banner = require("./Router/Banner");
const Service = require("./Router/Services");
const ProviderTrust = require("./Router/ProviderTrust");
const BlogPage = require("./Router/Blogs");

app.use("/api/admin",Admin)
app.use("/api/contact",contactus)
app.use("/api/banner",Banner)
app.use("/api/service",Service)
app.use("/api/ptrust",ProviderTrust)
app.use("/api/blog",BlogPage)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});

// some