const http = require('http');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// routes
const authRoute = require('./routes/auth');
const shopRoute = require('./routes/shop');
const adminRoute = require('./routes/admin');

// files
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getMilliseconds() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(cors());
app.use(express.json({ type: ['application/json'] }));
app.use(bodyParser.urlencoded({ extended: false }));

// const accessLogStream = fs.createWriteStream("/tmp/access.log");
    
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(compression());
// app.use(morgan("combined", { stream: accessLogStream }));
 
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).array('images')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

// router
app.use(authRoute);
app.use(shopRoute);
app.use('/admin', adminRoute);

mongoose.set('strictQuery', true);

// const server = http.createServer(app);

// connect MONGODB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(result => {
    const serverIo = app.listen(process.env.PORT || 5000);
    const io = require('./socket').init(serverIo);
    io.on('connection', socket => {
      console.log('Connected');
    });
    // app.listen(5000);
  })
  .catch(err => console.log(err));

// module.exports = server;
