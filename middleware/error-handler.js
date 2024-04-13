const util = require('util')

module.exports = (err, req, res, next) => {
    if (err.status == 404) {
        res.render('404/404')
    } else {
        res.status(500).json({
            error: util.format(err)
        })
    }
}