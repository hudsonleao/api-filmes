'use strict';

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('usuarios', [
            {
                usuario: 'admin',
                senha: '25d55ad283aa400af464c76d713c07ad',
                nivel: 'admin',
                ativo: 1
            }, 
            {
                usuario: 'normal',
                senha: '25d55ad283aa400af464c76d713c07ad',
                nivel: 'normal',
                ativo: 1
            },
            {
                usuario: 'administrador',
                senha: '25d55ad283aa400af464c76d713c07ad',
                nivel: 'admin',
                ativo: 1
            },
            {
                usuario: 'normal1',
                senha: '25d55ad283aa400af464c76d713c07ad',
                nivel: 'normal',
                ativo: 1
            },
        ], {});
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('usuarios', null, {});
    }
};
