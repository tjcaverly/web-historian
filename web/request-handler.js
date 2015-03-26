var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require("url");
var httpHelper = require("./http-helpers");
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log(req.url);
  if(req.method === "GET"){
    var pathname = url.parse(req.url).pathname;
    if(pathname === '/'){
      httpHelper.serveAssets(res, archive.paths.index );
    } else if (pathname === '/styles.css') {
      httpHelper.serveAssets(res, archive.paths.css );
    }
    else{
      httpHelper.serveAssets(res, pathname);
    }
  } else if(req.method === "POST") {
    var buffer = '';
    req.on('data', function(data) {
      buffer += data;
    })
    req.on('end', function(){
      var theUrl = buffer.slice(4);
      archive.addUrlToList(theUrl, function(){
        res.writeHead(302, {
          'Location':archive.paths.siteAssets + '/loading.html'
        });
        res.end();
      });

    } );


  }
  //res.end(archive.paths.list);
};
