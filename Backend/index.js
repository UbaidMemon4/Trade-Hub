const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Connectdb = require("./config/db");

//router import
const authRoute = require("./Route/authRoute");
const postRoute = require("./Route/postRoute");

//env config
dotenv.config();

//mongodb comnnection
Connectdb();

//rest object
const app = express();

//middle wares
app.use(cors());
app.use(express.json());

//routes
app.use("/auth", authRoute);
app.use("/post", postRoute);

//Port
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send(`<h1>Trade_Hub Server Running On Port ${port}</h1>`);
});
//listen
app.listen(port, () => {
  console.log(`Server Running On Port ${port}`);
});
