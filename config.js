/**
 * Created by 1 on 15/8/6.
 */
var _ = require('lodash')
    , root = __dirname;

var baseConfig = {
    env: process.env.NODE_ENV,
    root: root
};

var envConfig = {
    development: {
        server: {
            port: 9966
        },
        mongo: {
            url: 'mongodb://baba:baba@localhost:27017/baba'
        }
    },
    production: {
        server: {
            port: 9966
        },
        mongo: {
            url: 'mongodb://localhost:20099/baba'
        }
    }
};

// override the base configuration with the platform specific values
module.exports = _.merge(baseConfig, envConfig[baseConfig.env || (baseConfig.env = 'development')]);
