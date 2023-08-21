// Includes
const http = require('../util/http.js').func
const getGeneralToken = require('../util/getGeneralToken.js').func

// Args
exports.required = ['assetId']
exports.optional = ['jar']

// Docs
/**
 🔐 Configure permissions of an asset.
 * @category Develop
 * @alias configureAssetPermissions
 * @param {number} assetId - The id of the asset.
 * @param {ConfigureAssetPermissionsRequest[]} requests - The requested changes
 * @returns {Promise<boolean>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const success = await noblox.configureAssetPermissions(12356)
**/

// Define
exports.func = function (args) {
  return getGeneralToken({
    jar: args.jar
  }).then(function (token) {
    args.token = token

    return http({
      url: '//apis.roblox.com/asset-permissions-api/v1/assets/' + args.assetId + '/permissions',
      options: {
        method: 'PATCH',
        jar: args.jar,
        headers: {
          'X-CSRF-TOKEN': args.token
        },
        json: {
          requests: args.requests
        }
      }
    })
  })
}
