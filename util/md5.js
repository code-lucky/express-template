const crypto = require('crypto')
const encryption = '061aed79-37a7-4a43-b59c-2f11ca17a2ac'
module.exports = str =>{
    return crypto.createHash('md5')
    .update(encryption + str)
    .digest('hex')
}