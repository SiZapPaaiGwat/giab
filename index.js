var fs = require('fs')
var path = require('path')
var Promise = require('bluebird')
var giab = require('./src/giab')
var CONST = require('./src/const')
var utils = require('./src/util')
var readme = fs.readFileSync(CONST.README_NAME, 'utf8')
var rc = null

try {
  rc = utils.getGiabRC(CONST.RC_NAME)
} catch(e) {
}

utils.checkRC(rc)

var github = giab.init(rc)
var outputFilename = CONST.output ? path.normalize(CONST.output.filename) : CONST.README_NAME

if (Array.isArray(rc.issues)) {
  Promise.map(rc.issues, function(item) {
    return github.issues.repoIssuesAsync(item.owner, item.repo)
  }, {concurrency: 5})
  .then(function(blogs) {
    var items = []
    var totalIssue = 0
    blogs.forEach(function(list, i) {
      items.push(`### ${rc.issues[i].owner}`)
      items.push(list.map(utils.formatIssueItem).join('\n'))
      totalIssue += list.length
    })

    fs.writeFileSync(outputFilename, utils.replaceREADME(readme, items.join('\n\n'), CONST.REG))
    console.log(`
      ${totalIssue} blog posts have been inserted to ${CONST.README_NAME}.
      Repository number: ${rc.issues.length}.
    `)
  })
} else if (typeof rc.issues === 'object') {
  github.issues.repoIssuesAsync(rc.issues.owner, rc.issues.repo).then(function(list) {
    var str = list.map(utils.formatIssueItem).join('\n')
    fs.writeFileSync(outputFilename, utils.replaceREADME(readme, str, CONST.REG))

    console.log(`
      ${list.length} blog posts have been inserted to ${CONST.README_NAME}
    `)
  })
} else {
  console.warn(`You have not set .giabrc issues.`)
}
