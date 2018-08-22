'use strict';

const LaunchDarkly = require('ldclient-node');
const express = require('express');

const app = express();
const user = {
  "key": "aa0ceb2",
  "firstName": "Ernestina",
  "lastName": "Evans",
  "email": "ernestina@example.com",
}
const ldclient = LaunchDarkly.init(process.env.LDSDKKEY);

ldclient.once('ready', function() {
  app.get('/', (req, res) => {
    ldclient.allFlags(user, function(err, allFlags) {
      res.status(200).send(JSON.stringify(allFlags));
    });
  });

  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
});

module.exports = app;
