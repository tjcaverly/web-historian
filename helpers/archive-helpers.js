var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  index: path.join(__dirname, '../web/public/index.html'),
  css: path.join(__dirname, '../web/public/styles.css'),
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb){
  fs.readFile(exports.paths.list, function (err, data){
    if (cb) {
      cb(data.toString().split("\n"))
      }
    });
};

exports.isUrlInList = function(url, cb){
  exports.readListOfUrls(function(list){
    cb(_.contains(list, url));
  })
};

exports.addUrlToList = function(url, cb){
  fs.appendFile(exports.paths.list, url+'\n', function(err) {
    if (cb){
      cb(url);
    }
  });
};

exports.isUrlArchived = function(url, cb){
    fs.readdir(exports.paths.archivedSites, function(err, files) {
      cb(_.contains(files, url));
    } )


  // fs.readFile(exports.paths.list, function (err, data){
  //     cb(_.contains(data.toString().split("\n"), url))
  //  });

};

exports.downloadUrl = function(url, cb) {
  var options = {
    host: url
  }
  console.log("downloading!");
  var content = "";
  http.get(options, function(res) {
    res.on("data", function(chunk) {
      content += chunk;
    });
    res.on("end", function() {
      fs.writeFile(exports.paths.archivedSites + '/' + url, content);
    })
  })
}

exports.downloadUrls = function(urlArray){

    _.each(urlArray, function(url){
      console.log(url);
      exports.downloadUrl(url);
    });
};
