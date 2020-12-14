'use strict';

module.exports = {
    up: async (queryInterface) => {

        await queryInterface.bulkInsert('filmes', 
            [
                {
                    nome: 'Vingadores: Guerra Infinita',
                    diretores: 'Anthony Russo, Joe Russo',
                    generos: 'Ação, Aventura, Drama',
                    atores: 'Robert Downey Jr., Chris Evans, Mark Ruffalo',
                    resumo: 'Depois dos acontecimentos devastadores de Vingadores: Guerra Infinita (2018), o universo está em ruínas. Com a ajuda dos aliados restantes, os Vingadores se reúnem mais uma vez para reverter as ações de Thanos e restaurar o equilíbrio do universo.',
                    nota_media: 'N/A'
                },
                {
                    nome: 'Velozes & Furiosos',
                    diretores: 'Rob Cohen',
                    generos: 'Ação',
                    atores: 'Vin Diesel, Paul Walker, Michelle Rodriguez',
                    resumo: 'O policial de Los Angeles, Brian O\'Conner, deve decidir onde realmente reside sua lealdade quando se apaixona pelo mundo das corridas de rua que foi enviado para destruir disfarçado.',
                    nota_media: 'N/A'
                },
                {
                    nome: 'O Senhor dos Anéis: A Sociedade do Anel',
                    diretores: 'Peter Jackson',
                    generos: 'Ação, Aventura, Drama',
                    atores: 'Elijah Wood, Ian McKellen, Orlando Bloom',
                    resumo: 'Um manso Hobbit do Condado e oito companheiros partem em uma jornada para destruir o poderoso Um Anel e salvar a Terra-média do Lorde das Trevas Sauron.',
                    nota_media: 'N/A'
                },
                {
                    nome: 'Harry Potter e a Pedra Filosofal',
                    diretores: 'Chris Columbus',
                    generos: 'Aventura, Família, Fantasia',
                    atores: 'Daniel Radcliffe, Rupert Grint, Richard Harris',
                    resumo: 'Um menino órfão se matricula em uma escola de magia, onde aprende a verdade sobre si mesmo, sua família e o terrível mal que assombra o mundo mágico.',
                    nota_media: 'N/A'
                },
                {
                    nome: 'Star Wars: A Ascensão Skywalker',
                    diretores: 'J.J. Abrams',
                    generos: 'Aventura, Família, Fantasia',
                    atores: 'Daisy Ridley, John Boyega, Oscar Isaac',
                    resumo: 'Os membros sobreviventes da resistência enfrentam a Primeira Ordem mais uma vez, e o lendário conflito entre os Jedi e os Sith atinge seu auge, trazendo a saga Skywalker ao seu fim.',
                    nota_media: 'N/A'
                },
                {
                    nome: 'Han Solo: Uma História Star Wars',
                    diretores: 'Ron Howard',
                    generos: 'Ação, Aventura',
                    atores: 'Alden Ehrenreich, Woody Harrelson, Emilia Clarke',
                    resumo: 'Durante uma aventura no submundo do crime, Han Solo conhece seu futuro co-piloto Chewbacca e encontra Lando Calrissian anos antes de se juntar à Rebelião.',
                    nota_media: 'N/A'
                }
            ], {});

    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('filmes', null, {});

    }
};
