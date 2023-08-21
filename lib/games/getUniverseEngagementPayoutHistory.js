// Includes
const http = require('../util/http.js').func

// Args
exports.required = ['universeId', 'startDate', 'endDate']
exports.optional = ['jar']

// Docs
/**
 * 🔐 Returns the engagement payout history for a specific universe and a given date range, specified by start and end dates.
 * @category Game
 * @alias getUniverseEngagementPayoutHistory
 * @param {number} universeId - The ID of the universe in question.
 * @param {string} startDate - The first date in the range, specified as yyyy-MM-dd.
 * @param {string} endDate - The last date in the range, specified as yyyy-MM-dd.
 * @returns {Promise<UniversePayoutHistoryResult>}
 */

function getUniverseEngagementPayoutHistory (universeId, startDate, endDate, jar) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//engagementpayouts.roblox.com/v1/universe-payout-history?universeId=${universeId}&startDate=${startDate}&endDate=${endDate}`,
      options: {
        method: 'GET',
        jar: jar,
        resolveWithFullResponse: true
      }
    }
    return http(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          resolve(JSON.parse(res.body))
        } else {
          const body = res.body || {}
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            })
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`))
          } else {
            reject(new Error(`${res.statusCode} An error has occurred ${res.body ? res.body : ''}`))
          }
        }
      })
      .catch(error => reject(error))
  })
}

// Define
const datePattern = /^\d{4}-\d{2}-\d{2}$/
exports.func = function ({ universeId, startDate, endDate, jar }) {
  if (isNaN(universeId)) {
    throw new Error('The provided universe ID is not a number.')
  }
  if (!datePattern.test(startDate)) {
    throw new Error('The provided startDate is not valid.')
  }
  if (!datePattern.test(endDate)) {
    throw new Error('The provided endDate is not valid.')
  }
  return getUniverseEngagementPayoutHistory(universeId, startDate, endDate, jar)
}
