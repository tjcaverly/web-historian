var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  fs.readFile(asset,function(err,file){
    if(err){
         //sice "/" off asset
        fs.readFile(archive.paths.archivedSites + asset, function(err,file){
            if(err){
                console.log("ignore", err);
                res.writeHead(404);
                res.end();
            } else {
              console.log("getting file from archive");
              res.writeHead(200);
              res.end(file);

            }
          });

    } else {
      res.writeHead(200);
      res.end(file);
    }

  })


  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};



// As you progress, keep thinking about what helper functions you can put here!
