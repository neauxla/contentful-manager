const express = require('express');
const router = express.Router();
const DataService = require('../bin/services.js');
var app = express();


/* GET home page. */
router.get('/getContentTypes', function(req, res, next) {
    // Get content types for display
    console.log("Before call");
    DataService.getContentTypes(function(err, result) {
        console.log("after call");
        if (err) {
            console.log("err");
            res.render('error.ejs', {
                title: 'Error',
                message: 'No Content Types',
                error: err
            });
        }
        // Render results
        console.log("Render call");
        res.render('index.ejs', {
            title: 'Contentful Mgmt',
            contentTypes: result
        });
    });
});
router.post('/actions/:action/:contentType', function(req, res, next) {
    if (req.params.action == 'delete-entries') {
        DataService.removeEntries(req.params.contentType, function(err, result) {
            if (err) {
                return res.send(err);
            } else {
                res.sendStatus(200);
            }
        });
    } else {
        res.sendStatus(200);
        //res.end("Unknown Action");
    }
    //res.sendStatus(200);
});

module.exports = router;

app.use("/contents", router);
app.listen(4000, function() {
    console.log("App at Port 4000");
});