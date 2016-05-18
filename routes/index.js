const express = require('express');
const router = express.Router();
const DataService = require('../bin/services.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  // Get content types for display
  DataService.getContentTypes(function(err, result) {
    if(err) {
      res.render('error', {title: 'Error', message: 'No Content Types', error: err});
    }
    // Render results
    res.render('index', { title: 'Contentful Mgmt', contentTypes: result});
  });
});
router.post('/actions/:action', function(req, res, next) {
  if(req.params.action == 'delete-entries') {
    DataService.deleteEntries(req.body.contentType, function(err, result) {
      if(err) {
        return res.send(err);
      }
      res.sendStatus(200);
    });
  }
  res.sendStatus(200);
});

module.exports = router;
