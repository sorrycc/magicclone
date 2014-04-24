"use strict";

var debug = require('debug')('mc:github');
var request = require("request");
var zlib = require("zlib");
var prompt = require('prompt');

var get = function(url, cb) {
  debug("get: %s", url);
  var opts = {
    url: url,
    headers: {
      "User-Agent": "Safari",
      "Accept-Encoding": "gzip"
    },
    encoding: null
  }
  request(opts, function(err, res, body) {
    if (err) return console.error("request error: %s with url: %s", err, url);
    zlib.unzip(body, function(err, buffer) {
      if (err) return console.error("unzip error: %s", err);
      var o = JSON.parse(buffer.toString());
      cb(o);
    });
  });
};

var search = function(keyword, cb) {
  console.log("Searching: %s", keyword);
  var url = "https://api.github.com/search/repositories?q=" + keyword;
  get(url, function(o) {
    console.log("Results: ");
    var items = o.items;
    items.forEach(function(item, index) {
      if (index > 8) return;
      console.log("  [%s] %s", index + 1, item.full_name);
    });

    prompt.start();
    prompt.get({
      name: 'index',
      description: 'Input index to clone',
      required: true,
      pattern: /^\d$/,
      default: 1
    }, function(err, result) {
      if (result) {
        cb(items[result.index - 1].full_name);
      }
    });
  });
};

var getRepos = function(type, name, cb) {
  if (type != "user" && type != "org") {
    console.error("invalid type: %s", type);
    return;
  }

  console.log("Fetching %s %s's repos", type, name);
  var url = "https://api.github.com/" + type + "s/" + name + "/repos?per_page=100";
  get(url, function(o) {
    if (o.message) {
      console.error("error: %s", o.message);
      return;
    }

    console.log("Results: ");
    o.forEach(function(item) {
      console.log("  %s", item.full_name);
    });

    prompt.start();
    prompt.get({
      name: 'confirm',
      description: 'Clone all these repos? Y/n',
      required: true,
      pattern: /^[Yn]$/,
      default: "Y"
    }, function(err, result) {
      if (result && result.confirm === "Y") {
        var repos = o.map(function(item) {
          return item.full_name;
        });
        cb(repos);
      }
    });
  });
};

exports.search = search;
exports.getRepos = getRepos;
