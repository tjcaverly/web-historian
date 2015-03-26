var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require("url");
var httpHelper = require("./http-helpers");
var http = require('http');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log(req.url);
  if(req.method === "GET"){
    var pathname = url.parse(req.url).pathname;
    if(pathname === '/'){
      pathname = "/index.html";
    }
    httpHelper.serveAssets(res, pathname);

  } else if(req.method === "POST") {
    var buffer = '';
    req.on('data', function(data) {
      buffer += data;
    })
    req.on('end', function(){
      var theUrl = buffer.slice(4);

      archive.isUrlInList(theUrl, function(isInList) {
        if ( !isInList ) {
          archive.addUrlToList(theUrl);
        }
      });

      archive.isUrlArchived(theUrl, function(isInArchive) {
        if (!isInArchive) {
          console.log("loading");
          res.writeHead(302, {
            'Location':'/loading.html'
          });
          res.end();
        } else {
          res.writeHead(302, {
            'Location':'/' + theUrl
          });
          res.end();
        }
      });

      });
    }
};
