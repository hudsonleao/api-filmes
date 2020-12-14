'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('usuarios', {
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
                allowNull: false,
                defaultValue: 'admin'
            },
            ativo: {
                type: Sequelize.INTEGER(1),
                allowNull: false,
                defaultValue: 1
            }
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('usuarios');
    }
};
