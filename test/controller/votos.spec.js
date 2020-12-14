/*eslint-disable */
const { expect } = require('chai');
const request = require('supertest');
const app = require('../../app');
const Sequelize = require('sequelize');

describe('TESTANDO ROTAS VOTOS...', () => {

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
        FROM votos 
        WHERE filmes_id=1
        AND usuarios_id=1
        AND nota=2`;
        await app.sequelize.query(query, { type: Sequelize.QueryTypes.DELETE });
    });

    describe('TESTANDO RESPOSTAS DE SUCESSO...', () => {
        describe('POST :: /api/v1/votar', () => {
            it('Teste na rota de votação, voto cadastrado', async () => {
                const response = await request(app)
                    .post('/api/v1/votar')
                    .set('authorization', `Bearer ${token}`)
                    .send({
                        id_filme: 1,
                        nota: 2
                    })
                    .expect(200);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body).to.haveOwnProperty('data');
                expect(response.body.message).to.equal('Voto cadastrado com sucesso!');
                expect(response.body.data).to.haveOwnProperty('usuario');
                expect(response.body.data.usuario).to.equal('admin');
                expect(response.body.data).to.haveOwnProperty('nota');
            });
        });
        describe('POST :: /api/v1/votar', () => {
            it('Teste na rota de votação, voto atualizado', async () => {
                const query = `INSERT INTO votos (filmes_id, usuarios_id, nota)
                    VALUES 
                    ('1', '1', '0')`;
                await app.sequelize.query(query, { type: Sequelize.QueryTypes.INSERT });

                const response = await request(app)
                    .post('/api/v1/votar')
                    .set('authorization', `Bearer ${token}`)
                    .send({
                        id_filme: 1,
                        nota: 2
                    })
                    .expect(200);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body).to.haveOwnProperty('data');
                expect(response.body.message).to.equal('Voto atualizado com sucesso!');
                expect(response.body.data).to.haveOwnProperty('usuario');
                expect(response.body.data.usuario).to.equal('admin');
                expect(response.body.data).to.haveOwnProperty('nota');
            });
        });

    });
    describe('TESTANDO RESPOSTAS DE ERRO...', () => {
        describe('POST :: /api/v1/votar', () => {
            it('Teste na rota de votação, nota não está entre 0 e 4', async () => {
                const response = await request(app)
                    .post('/api/v1/votar')
                    .set('authorization', `Bearer ${token}`)
                    .send({
                        id_filme: 1,
                        nota: 5
                    })
                    .expect(400);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message).to.equal('O valor da nota deve ser entre 0 e 4.');
            });
        });
    });
    describe('TESTANDO RESPOSTAS DE ERRO...', () => {
        describe('POST :: /api/v1/votar', () => {
            it('Teste na rota de votação, id do filme inválido', async () => {
                const response = await request(app)
                    .post('/api/v1/votar')
                    .set('authorization', `Bearer ${token}`)
                    .send({
                        id_filme: 0,
                        nota: 4
                    })
                    .expect(400);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message).to.equal('Filme não encontrado, verifique os dados e tente novamente.');
            });
        });
    });
});