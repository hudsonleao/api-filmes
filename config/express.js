const express = require('express');
const consign = require('consign');
const sequelize = require('./sequelize')();
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const cors = require('cors');
const rotasSemToken = require('../app/routes/rotasSemToken');

module.exports = function () {
    let app = express();
    const jwtSecret = '2423rWFq21fdEr3awr';
    app.sequelize = sequelize.getConnection();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/', express.static('static'));
    app.use(require('method-override')());
    app.use(cors());
    app.options('*', cors());
    app.use('/api/v1', app._router);

    const RotasSemToken = new rotasSemToken(app);
    RotasSemToken.main();

    app.use(jwt({ secret: jwtSecret, algorithms: ['HS256'] }));
    consign({ cwd: 'app', verbose: false })
        .include('models')
        .then('controllers')
        .then('routes')
        .into(app);

    return app;
};