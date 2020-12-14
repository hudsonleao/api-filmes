let Sequelize = require('sequelize');
module.exports = function (app) {

    let Votos = app.sequelize.define('votos', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        filmes_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'filmes',
                key: 'id'
            }
        },
        usuarios_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'usuarios',
                key: 'id'
            }
        },
        nota: {
            type: Sequelize.INTEGER(1),
            allowNull: false
        }
    }, {

        createdAt: false,
        updatedAt: false,
        deletedAt: false,
        freezeTableName: true,
        tableName: 'votos'
    });

    return Votos;
};