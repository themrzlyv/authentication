const path = require('path')

module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    env: {
        BASE_URI: "http://localhost:3050"
    }
}