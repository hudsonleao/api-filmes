const Sequelize = require('sequelize');
module.exports = function() {
    let controller = {};

    const getConfig = () => {
        let config = {
            host: 'localhost',
            database: 'databasename',
            user: 'root',
            pass: '',
            adapter: 'mysql',
            reconnect: true,
            logging: false
        };
        let env = process.env.NODE_ENV || 'development';
        if (env === 'development') {
            config.host = '127.0.0.1';
            config.database = 'filmes';
            config.user = 'root';
            config.pass = '';
            console.log('Database connected as development...');
        } else if (env === 'test') {
            config.host = process.env.NODE_MYSQL_HOST || '127.0.0.1';
            config.database = process.env.NODE_MYSQL_DATABASE ||'filmes';
            config.user = process.env.NODE_MYSQL_USER ||'filmes';
            config.pass = process.env.NODE_MYSQL_PASS ||'sdjadsfbnae21@dasd';
            console.log('Database connected as test...');
        } else if (env === 'production') {
            config.host = process.env.NODE_MYSQL_HOST || '127.0.0.1';
            config.database = process.env.NODE_MYSQL_DATABASE ||'filmes';
            config.user = process.env.NODE_MYSQL_USER ||'filmes';
            config.pass = process.env.NODE_MYSQL_PASS ||'sdjadsfbnae21@dasd';
            config.logging = false;
            console.log('Database connected as production...');
        }
        return config;
    };

    controller.getConnection = function() {
        let config = getConfig();
        let connection = new Sequelize(config.database, config.user, config.pass, 
            {
                host: config.host,
                dialect: config.adapter,
                reconnect: config.reconnect,
                logging: config.logging
            });
        return connection;
    };

    return controller;
};