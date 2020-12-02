//Dependencies
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")

const PORT = process.env.PORT || 3000

const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//Mongoose connection to workout database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true
});





// routes
require("./routes/api-routes.js");
require("./routes/html-routes.js");


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });