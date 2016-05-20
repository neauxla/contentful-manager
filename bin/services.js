const _ = require('lodash');
const RateLimiter = require('limiter').RateLimiter;
const contentful = require('contentful-management');
const ACCESS_TOKEN = '';
const SPACE_ID = '';
const client = contentful.createClient({
    accessToken: ACCESS_TOKEN,
    secure: true
});

module.exports = {
    getContentTypes: getContentTypes,
    removeEntries: removeEntries
}

function removeEntries(contentTypeId, callback) {
    getEntries(contentTypeId, true, function(err, entries) {
        if (err) callback(err, false);
        //var ids = _.map(entries, 'sys.id');

        deleteEntries(entries, function(err, result) {
            callback(err, result);
        });
    });
}

function deleteEntries(entries, callback) {
    getSpace(function(err, space) {
        console.log('del');
        for (var i = 0; i < entries.length; i++) {
            space.deleteEntry(entries[i]).catch(function(err) {
                console.log(err);
            }).then(function(result) {
                console.log(result);
            });
        }
        callback(null, true);
    });
}

// function deleteEntriesBulk(entries, callback) {
//   var limiter = new RateLimiter(10, 1000);
//   getSpace(function(err, space) {
//     limiter.removeTokens(1, function(err, remainingRequests) {
//       space.deleteEntry(entry).catch(function(err) {
//         console.log(err);
//       }).then(function(result) {
//         console.log(result);
//       });
//
//       if(remainingRequests == 0)
//     });
//   });
// }

function getEntries(contentType, isPublished, callback) {
    getSpace(function(err, space) {
        space.getEntries({
            content_type: contentType
        }).catch(function(err) {
            callback(err, false);
        }).then(function(entries) {
            callback(false, entries)
        });
    });
}

function getContentTypes(callback) {
    getSpace(function(err, space) {
        space.getContentTypes().catch(function(err) {
            callback(err, false);
        }).then(function(contentTypes) {
            callback(false, contentTypes);
        });
    })
}

function getSpace(callback) {
    client.getSpace(SPACE_ID).catch(function(err) {
        callback('Could not find space: ' + err, false);
    }).then(function(space) {
        callback(false, space);
    });
}