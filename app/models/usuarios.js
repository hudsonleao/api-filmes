let Sequelize = require('sequelize');
module.exports = function (app) {
	
    let Usuarios = app.sequelize.define('usuarios', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        usuario: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        senha: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        nivel: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        ativo: {
            type: Sequelize.INTEGER(1),
            allowNull: false
        }
    }, {

        createdAt: false,
        updatedAt: false,
        deletedAt: false,
        freezeTableName: true,
        tableName: 'usuarios'
    });

    return Usuarios;
};