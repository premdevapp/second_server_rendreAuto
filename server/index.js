const serverless = require('serverless-http');
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();

const port = 3000;

// Connect to MongoDB
 const database =new mongoose.connect(
   `mongodb+srv://premnath:Premnath@nftcluster.eayls.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  //`mongodb://${process.env.host}:${process.env.port}/${process.env.dbname}`,
  {
     /* auth: {
      username: "root",
      password: "rootpassword",
    },
    authSource: "admin",  */
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => {
    console.log("MongoDB Connection established successfully.");
  })
  .catch((err) => {
    console.log(err);
  });

// env

const isProdOrDev = process.env.NODE_ENV === 'development';

app.use(cors());
app.use(require('morgan')('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(require('./routes'));

app.use((req, res, next)=> {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

 // error
 // development error handler
// will print stacktrace
if (!isProdOrDev) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});
  

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on  port ${port}...`);
});

module.exports.handler = serverless(app);
module.exports = database