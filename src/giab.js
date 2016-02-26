var GitHubApi = require('github')
var Promise = require('bluebird')

exports.init = function(rc) {
  var github = new GitHubApi({
      version: '3.0.0',
      protocol: 'https',
      timeout: 15000
  })
  github.authenticate(rc)

  github.issues.repoIssuesAsync = function(owner, repo) {
    return new Promise(function(resolve, reject) {
      github.issues.repoIssues({
        user: owner,
        repo: repo
      }, function(err, list) {
        if (err) {
          reject(err)
          return
        }

        resolve(list)
      })
    })
  }

  return github
}
