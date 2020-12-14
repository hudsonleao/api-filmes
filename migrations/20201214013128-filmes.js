'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('filmes', {
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
                allowNull: false,
                defaultValue: 'N/A'
            },
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('filmes');
    }
};
