var CONST = require('./const')
var fs = require('fs')

exports.getGiabRC = function getGiabRC(filename) {
  return JSON.parse(fs.readFileSync(filename, 'utf8'))
}

exports.replaceREADME = function replaceREADME(content, issueListString, reg) {
  var blogList = `${CONST.START_TAG}\n\n${issueListString.trim()}\n\n${CONST.END_TAG}`
  return content.replace(reg, blogList)
}

exports.formatIssueItem = function formatIssueItem(item) {
  var date = new Date(item.created_at).toLocaleDateString()
  return `> * [${date} - ${item.title}](${item.html_url})`
}

exports.checkRC = function checkRC(rc) {
  if (!rc) {
    throw new Error(`.giabrc not found.\n${CONST.RC_SAMPLE}`)
  }

  if (!rc.issues || !rc.issues.owner || !rc.issues.repo) {
    throw new Error(`.giabrc config missing.\n${CONST.RC_SAMPLE}`)
  }
}
