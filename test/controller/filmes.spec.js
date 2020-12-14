/*eslint-disable */
const { expect } = require('chai');
const request = require('supertest');
const app = require('../../app');
const Sequelize = require('sequelize');

describe('TESTANDO ROTAS FILMES...', () => {
    let token;
    beforeEach(async () => {
        const response = await request(app)
            .get('/api/v1/auth/token')
            .send({ usuario: 'admin', senha: '12345678' })
            .expect(200);
        token = response.body.token;
    });

    afterEach(async () => {
        let query = `DELETE
        FROM filmes 
        WHERE nome='testeinsert'
        OR nome='testeError'
        OR nome='teste'
        AND diretores='string'
        AND generos='string'
        AND atores='string'
        AND resumo='string'`;
        await app.sequelize.query(query, { type: Sequelize.QueryTypes.DELETE });
    });

    describe('TESTANDO RESPOSTAS DE SUCESSO...', () => {
        describe('GET :: /api/v1/filmes', () => {
            it('Teste na rota de listar todos os filmes', async () => {

                const response = await request(app)
                    .get('/api/v1/filmes')
                    .set('authorization', `Bearer ${token}`)
                    .expect(200);

                expect(response.body).to.haveOwnProperty('data');
                expect(response.body).to.haveOwnProperty('count');
                expect(response.body.data[0]).to.haveOwnProperty('id');
                expect(response.body.data[0]).to.haveOwnProperty('nome');
                expect(response.body.data[0]).to.haveOwnProperty('diretores');
                expect(response.body.data[0]).to.haveOwnProperty('generos');
                expect(response.body.data[0]).to.haveOwnProperty('atores');
                expect(response.body.data[0]).to.haveOwnProperty('resumo');
                expect(response.body.data[0]).to.haveOwnProperty('nota_media');
            });
        });
        describe('GET :: /api/v1/filmes?pagina=0&limite=100', () => {
            it('Teste na rota de listar todos os filmes com filtro', async () => {

                const response = await request(app)
                    .get('/api/v1/filmes?pagina=0&limite=100')
                    .set('authorization', `Bearer ${token}`)
                    .expect(200);

                expect(response.body).to.haveOwnProperty('data');
                expect(response.body).to.haveOwnProperty('count');
                expect(response.body.data[0]).to.haveOwnProperty('id');
                expect(response.body.data[0]).to.haveOwnProperty('nome');
                expect(response.body.data[0]).to.haveOwnProperty('diretores');
                expect(response.body.data[0]).to.haveOwnProperty('generos');
                expect(response.body.data[0]).to.haveOwnProperty('atores');
                expect(response.body.data[0]).to.haveOwnProperty('resumo');
                expect(response.body.data[0]).to.haveOwnProperty('nota_media');
            });
        });
        describe('GET :: /api/v1/filmes/filtro?nome=testeinsert&diretor=string&genero=string&ator=string', () => {
            it('Teste na rota de filtrar filme', async () => {

                const query = `INSERT INTO filmes (nome, diretores, generos, atores, resumo, nota_media)
                VALUES 
                ('testeinsert', 'string', 'string', 'string', 'string', 'N/A')`;
                await app.sequelize.query(query, { type: Sequelize.QueryTypes.INSERT });

                const response = await request(app)
                    .get('/api/v1/filmes/filtro?nome=testeinsert&diretor=string&genero=string&ator=string')
                    .set('authorization', `Bearer ${token}`)
                    .expect(200);

                expect(response.body).to.haveOwnProperty('data');
                expect(response.body).to.haveOwnProperty('count');
                expect(response.body.data[0]).to.haveOwnProperty('id');
                expect(response.body.data[0]).to.haveOwnProperty('nome');
                expect(response.body.data[0]).to.haveOwnProperty('diretores');
                expect(response.body.data[0]).to.haveOwnProperty('generos');
                expect(response.body.data[0]).to.haveOwnProperty('atores');
                expect(response.body.data[0]).to.haveOwnProperty('resumo');
                expect(response.body.data[0]).to.haveOwnProperty('nota_media');
                expect(response.body.data[0].nome).to.equal('testeinsert');
                expect(response.body.data[0].diretores).to.equal('string');
                expect(response.body.data[0].generos).to.equal('string');
                expect(response.body.data[0].resumo).to.equal('string');
                expect(response.body.data[0].nota_media).to.equal('N/A');

            });
        });

        describe('GET :: /api/v1/filmes/filtro?pagina=0&limite=100', () => {
            it('Teste na rota de filtrar filme, sem nenhum parâmetro para filtro', async () => {

                const response = await request(app)
                    .get('/api/v1/filmes/filtro?pagina=0&limite=100')
                    .set('authorization', `Bearer ${token}`)
                    .expect(200);

                expect(response.body).to.haveOwnProperty('data');
                expect(response.body).to.haveOwnProperty('count');
                expect(response.body.data[0]).to.haveOwnProperty('id');
                expect(response.body.data[0]).to.haveOwnProperty('nome');
                expect(response.body.data[0]).to.haveOwnProperty('diretores');
                expect(response.body.data[0]).to.haveOwnProperty('generos');
                expect(response.body.data[0]).to.haveOwnProperty('atores');
                expect(response.body.data[0]).to.haveOwnProperty('resumo');
                expect(response.body.data[0]).to.haveOwnProperty('nota_media');

            });
        });

        describe('POST :: /api/v1/filmes', () => {
            it('Teste na rota de cadastrar filme', async () => {

                const response = await request(app)
                    .post('/api/v1/filmes')
                    .set('authorization', `Bearer ${token}`)
                    .send({
                        nome: 'teste',
                        diretores: ['string'],
                        generos: ['string'],
                        atores: ['string'],
                        resumo: 'string'
                    })
                    .expect(200);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body).to.haveOwnProperty('data');
                expect(response.body.message.toString()).to.equal('Filme cadastrado com sucesso!');
                expect(response.body.data).to.haveOwnProperty('nome');
                expect(response.body.data).to.haveOwnProperty('diretores');
                expect(response.body.data).to.haveOwnProperty('generos');
                expect(response.body.data).to.haveOwnProperty('atores');
                expect(response.body.data).to.haveOwnProperty('resumo');
            });
        });
    });

    describe('TESTANDO RESPOSTAS DE ERRO...', () => {
        describe('POST :: /api/v1/filmes', () => {
            it('Teste na rota de cadastrar filmes, usuario normal', async () => {
                const responseToken = await request(app)
                    .get('/api/v1/auth/token')
                    .send({ usuario: 'normal', senha: '12345678' })
                    .expect(200);
                let tokenNormal = responseToken.body.token;

                const response = await request(app)
                    .post('/api/v1/filmes')
                    .set('authorization', `Bearer ${tokenNormal}`)
                    .send({
                        nome: 'testeError',
                        diretores: ['string'],
                        generos: ['string'],
                        atores: ['string'],
                        resumo: 'string',
                        nota_media: '4'
                    })
                    .expect(401);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message.toString()).to.equal('Usuário não tem permissão para cadastrar filmes.')
            });
            it('Teste na rota de cadastrar filmes, campo nome vazio', async () => {

                const response = await request(app)
                    .post('/api/v1/filmes')
                    .set('authorization', `Bearer ${token}`)
                    .send({
                        nome: '',
                        diretores: ['string'],
                        generos: ['string'],
                        atores: ['string'],
                        resumo: 'string'
                    })
                    .expect(400);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message.toString()).to.equal('O nome do filme não pode ser vazio.')
            });
            it('Teste na rota de cadastrar filmes, campo diretores vazio', async () => {

                const response = await request(app)
                    .post('/api/v1/filmes')
                    .set('authorization', `Bearer ${token}`)
                    .send({
                        nome: 'testeError',
                        diretores: '',
                        generos: ['string'],
                        atores: ['string'],
                        resumo: 'string'
                    })
                    .expect(400);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message.toString()).to.equal('Os diretores do filme não podem ser vazios.')
            });
            it('Teste na rota de cadastrar filmes, campo diretores como string', async () => {

                const response = await request(app)
                    .post('/api/v1/filmes')
                    .set('authorization', `Bearer ${token}`)
                    .send({
                        nome: 'testeError',
                        diretores: 'string',
                        generos: ['string'],
                        atores: ['string'],
                        resumo: 'string'
                    })
                    .expect(400);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message.toString()).to.equal('Diretores devem ser um array')
            });
            it('Teste na rota de cadastrar filmes, campo generos vazio', async () => {

                const response = await request(app)
                    .post('/api/v1/filmes')
                    .set('authorization', `Bearer ${token}`)
                    .send({
                        nome: 'testeError',
                        diretores: ['string'],
                        generos: '',
                        atores: ['string'],
                        resumo: 'string'
                    })
                    .expect(400);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message.toString()).to.equal('Os generos do filme não podem ser vazios.')
            });
            it('Teste na rota de cadastrar filmes, campo generos como string', async () => {

                const response = await request(app)
                    .post('/api/v1/filmes')
                    .set('authorization', `Bearer ${token}`)
                    .send({
                        nome: 'testeError',
                        diretores: ['string'],
                        generos: 'string',
                        atores: ['string'],
                        resumo: 'string'
                    })
                    .expect(400);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message.toString()).to.equal('Generos devem ser um array')
            });
            it('Teste na rota de cadastrar filmes, campo atores vazio', async () => {

                const response = await request(app)
                    .post('/api/v1/filmes')
                    .set('authorization', `Bearer ${token}`)
                    .send({
                        nome: 'testeError',
                        diretores: ['string'],
                        generos: ['string'],
                        atores: '',
                        resumo: 'string'
                    })
                    .expect(400);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message.toString()).to.equal('Os atores do filme não podem ser vazios.')
            });
            it('Teste na rota de cadastrar filmes, campo atores como string', async () => {

                const response = await request(app)
                    .post('/api/v1/filmes')
                    .set('authorization', `Bearer ${token}`)
                    .send({
                        nome: 'testeError',
                        diretores: ['string'],
                        generos: ['string'],
                        atores: 'string',
                        resumo: 'string'
                    })
                    .expect(400);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message.toString()).to.equal('Atores devem ser um array')
            });
            it('Teste na rota de cadastrar filmes, campo resumo vazio', async () => {

                const response = await request(app)
                    .post('/api/v1/filmes')
                    .set('authorization', `Bearer ${token}`)
                    .send({
                        nome: 'testeError',
                        diretores: ['string'],
                        generos: ['string'],
                        atores: ['string'],
                        resumo: ''
                    })
                    .expect(400);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message.toString()).to.equal('O resumo do filme não pode ser vazio.')
            });
        });
    });
});