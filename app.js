var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var layout = require("express-layout");
var fs = require("fs");
var bodyParser = require("body-parser");
var formidable = require("formidable");
var ipModel = require("./src/propertyObject.js");
var contract = require("truffle-contract");
var Web3 = require("web3");
provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
web3 = new Web3(provider);
var myContractJSON = require("./build/contracts/StoreProperty.json");
var propertyContract = contract(myContractJSON);
propertyContract.setProvider(provider);

var binary = require("./convertToBinary");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

var middlewares = [
  layout(),
  express.static(path.join(__dirname, "public")),
  bodyParser.urlencoded({ extended: true })
];

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.post("/upload", (req, res) => {
  new formidable.IncomingForm();
  new formidable.IncomingForm()
    .parse(req)
    /*.on('field', (name, field) => {
    console.log('Field', name, field)
  })*/
    .on("file", (name, file) => {
      binary.convert(file, function(hash) {
        /*res.render('index', {
        title: 'Bit Protect',
        data: req.body, // { message, email }
        errors: {
          image: {
            image: 'Error with image'
          }
        },
        hash: result
      });  */
        //res.send(hash);
        propertyContract.deployed().then(function(i) {
          app = i;
          app
            .addIP(hash, {
              from: "0x3E946BdfDC3815b5e83E0a99C18865AF5e1f5E63"
            })
            .then(function(x) {
              console.log(x);
              res.send(hash + " - added to the network");
            });
        });
      });
    })
    .on("aborted", () => {
      console.error("Request aborted by the user");
    })
    .on("error", err => {
      console.error("Error", err);
      throw err;
    });

  /*console.log(req.body.file == null ? 0 : (results[1] || 0));
   */
});

app.get("/viewData", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  var propertyArray = [];

  propertyContract.deployed().then(function(i) {
    app = i;

    app.IPCount().then(function(c) {
      count = c.toNumber();
      //res.send(count);

      var promises = [];

      for (i = 1; i < count + 1; i++) {
        const promise = app.property(i).then(function(c) {
          property = c;

          ipObject = ipModel.create(
            property.id,
            property.propertyHash,
            property.timestamp
          );

          propertyArray.push(ipObject);
        });
        promises.push(promise);
      }

      Promise.all(promises)
        .then(() => {
          res.send(propertyArray);
        })
        .catch(e => {
          console.log("There has been an error. \n" + e);
        });
    });
  });
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
