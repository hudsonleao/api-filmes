let Sequelize = require('sequelize');
module.exports = function (app) {
	
    let Filmes = app.sequelize.define('filmes', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nome: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        diretores: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        generos: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        atores: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        resumo: {
            type: Sequelize.STRING(1000),
            allowNull: false
        },
        nota_media: {
            type: Sequelize.STRING(3),
            allowNull: false
        },
    }, {

        createdAt: false,
        updatedAt: false,
        deletedAt: false,
        freezeTableName: true,
        tableName: 'filmes'
    });

    return Filmes;
};