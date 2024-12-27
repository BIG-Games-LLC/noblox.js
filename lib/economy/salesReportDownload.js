// Includes
const { func: getGeneralToken } = require('../util/getGeneralToken')
const http = require('../util/http.js').func

// Args
exports.required = ['groupId', 'startDate']
exports.optional = ['endDate', 'jar']

// Docs
/**
 * 🔐 Requests the revenue summary for a group for a given time frame.
 * @category Group
 * @param {number} groupId - The group id to get Robux summary for.
 * @param {Date} startDate - The start date of the payout period.
 * @param {Date} endDate - The end date of the payout period.
**/
function salesReportDownload (groupId, startDate, endDate, token, jar) {
  if (!endDate) {
    const start = new Date(startDate);
    const year = start.getUTCFullYear();
    const month = start.getUTCMonth();
    endDate = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999));
  }
  const body = {
    targetId: groupId,
    targetType: 'Group',
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    transactionType: 'Sale'
  }
  const bodyJson = JSON.stringify(body)
  return http({
    url: '//economy.roblox.com/v2/sales/sales-report-download',
    options: {
      method: 'POST',
      body: bodyJson,
      jar,
      resolveWithFullResponse: true,
      headers: {
        'X-CSRF-TOKEN': token
      }
    }
  })
    .then(({ statusCode, body }) => {
      return JSON.parse(body)
    })
}

exports.func = function ({ groupId, startDate, endDate, jar }) {
  return getGeneralToken({ jar }).then((token) => {
    return salesReportDownload(groupId, startDate, endDate, token, jar)
  })
}
