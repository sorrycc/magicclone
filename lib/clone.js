"use strict";

var exec = require("child_process").exec;
var async = require('async');

var clone = function(repos) {
  if (!Array.isArray(repos)) {
    repos = [repos];
  }

  async.eachSeries(repos, function(repo, next) {
    console.log("Cloning repo: %s", repo);
    var url = "git@github.com:" + repo + ".git";
    exec("git clone " + url, function(err, stdout, stderr) {
      if (stderr) console.log(stderr);
      next();
    });
  });
};

module.exports = clone;
