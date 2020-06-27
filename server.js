require('dotenv').config();
const express = require('express'),
 router = express.Router(),
 cors = require('cors'),
 routes = require('./routes'),

 PORT = process.env.PORT || 3001,

  app = express();

  if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }

  app.use(cors())
  app.use(express.json())
  app.use('/', router)
  app.use(routes)

  app.listen(PORT, function() {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
