var path = require('path')
var CWD = process.cwd()
var START_TAG = '<!--giab:issue_list_start-->'
var END_TAG = '<!--giab:issue_list_end-->'
var RC_SAMPLE = `
.giabrc sample file content:
{
  "type": "basic",
  "username": "simongfxu",
  "password": "password here",
  "issues": {
    "repo": "simongfxu.github.com",
    "owner": "simongfxu"
  }
}
`

module.exports = {
  RC_NAME: path.normalize(CWD + '/.giabrc'),
  README_NAME: path.normalize(CWD + '/README.md'),
  START_TAG: START_TAG,
  END_TAG: END_TAG,
  CWD: CWD,
  REG: new RegExp(`${START_TAG}(\n|.)+${END_TAG}`),
  RC_SAMPLE: RC_SAMPLE,
  // flag用于评级文章参与度
  FIRE_LAG: ':fire:',
  HEART_FLAG: ':heart:'
}
