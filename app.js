require('./config/config');
require('./models/db');
const rateLimit = require("express-rate-limit");
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");
const rstIndex = require('./routes/index.route');
const app = express();

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request"
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});
app.use('/api/productImages', express.static('productImages'))
app.use('/api/flutterImages', express.static('flutterImages'))
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());
app.use('/api', rstIndex);
app.use(limiter);

app.get('/', (req, res) => {
  res.send('Hello World!')
  res.end()
})

const port = process.env.PORT || 5000

app.listen(port, () => console.log('Server started at port:' + port));


