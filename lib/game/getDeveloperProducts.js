// Includes
const http = require('../util/http.js').func

// Args
exports.required = ['universeId']
exports.optional = ['page', 'jar']

// Docs
/**
 * 🔐 Returns the existing developer products in a specified game.
 * @category Game
 * @alias getDeveloperProducts
 * @param {number} universeId - The ID of the universe whose developer products you want to retrieve
 * @param {number} [page=1] - Which page of developer products to return (pageSize is 50)
 * @returns {Promise<DeveloperProductsResult>}
 */

function getDeveloperProducts (jar, universeId, page) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//api.roblox.com/developerproducts/list?universeId=${universeId}&page=${page}`,
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
exports.func = function (args) {
  return getDeveloperProducts(args.jar, args.universeId, args.page || 1)
}
