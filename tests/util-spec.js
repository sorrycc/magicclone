
var util = require("../lib/util");

describe("util", function() {

  it("parseRepo", function() {
    util.parseRepo("sorrycc/magicclone").should.be.equal("git@github.com:sorrycc/magicclone.git");
    util.parseRepo("https://github.com/sorrycc/magicclone").should.be.equal("git@github.com:sorrycc/magicclone.git");
    util.parseRepo("https://git.oschina.net/sorrycc/inoherb.git").should.be.equal("https://git.oschina.net/sorrycc/inoherb.git");
    util.parseRepo("https://sorrycc@bitbucket.org/sorrycc/tpsmate.git").should.be.equal("https://sorrycc@bitbucket.org/sorrycc/tpsmate.git");
  });

});
