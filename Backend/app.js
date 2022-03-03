const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const PORT= process.env.PORT || 2000



//CORS Policy
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

const data = require("./data");
app.use(express.json());
app.use(data);



const CONNECTION_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cukln.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }).then(()=>{
    app.listen(PORT, () => {
        console.log("server started at port 5000");
      });
  })
  .catch((err)=>{
      console.log(err)
  })

