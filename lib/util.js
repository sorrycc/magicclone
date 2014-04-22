'use strict';

module.exports = {

  /**
   * Parse repo to clonable url.
   *
   * repo types:
   *   sorrycc/magicclone
   *   https://github.com/sorrycc/magicclone
   *   end with .git
   * 
   * @param  {String}
   * @return {String} return clonable url
   */
  parseRepo: function(repo) {
    var isEndOfGit = /\.git$/.test(repo);
    if (isEndOfGit) {
      return repo;
    }

    if (repo.indexOf("https://github.com/") === 0) {
      repo = repo.replace("https://github.com/", "");
    }
    repo = "git@github.com:" + repo + ".git";
    return repo;
  }
}

