"use strict";

var exec = require("child_process").exec;
var async = require('async');
var util = require('./util');

var clone = function(repos) {
  if (!Array.isArray(repos)) {
    repos = [repos];
  }

  async.eachSeries(repos, function(repo, next) {
    repo = util.parseRepo(repo);
    console.log("Cloning repo: %s", repo);
    exec("git clone " + repo, function(err, stdout, stderr) {
      if (stderr) console.log(stderr);
      next();
    });
  });
};

module.exports = clone;
