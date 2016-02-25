var GitHubApi = require("github")
var fs = require('fs')
var CONST = require('./const')
var utils = require('./util')
var readme = fs.readFileSync(CONST.README_NAME, 'utf8')
var rc = null

try {
  rc = utils.getGiabRC(CONST.RC_NAME)
} catch(e) {
}

utils.checkRC(rc)

var github = new GitHubApi({
    version: "3.0.0",
    protocol: "https",
    timeout: 15000
})
github.authenticate(rc)
github.issues.repoIssues({
  user: rc.issues.owner,
  repo: rc.issues.repo
}, function(err, list) {
  if (err) {
    console.error(err)
    return
  }

  var str = list.map(utils.formatIssueItem).join('\n')
  fs.writeFileSync(CONST.README_NAME, utils.replaceREADME(readme, str, CONST.REG))
})
