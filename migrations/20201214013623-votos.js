'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('votos', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            filmes_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'filmes',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'set null',
            },
            usuarios_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'usuarios',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'set null', 
            },
            nota: {
                type: Sequelize.INTEGER(1),
                allowNull: false
            }

        });

    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('votos');
    }
};