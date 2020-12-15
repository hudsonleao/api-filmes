/*eslint-disable */
const { expect } = require('chai');
const request = require('supertest');
const app = require('../../app');
const Sequelize = require('sequelize');

describe('TESTANDO ROTAS ROTAS SEM TOKEN...', () => {
    afterEach(async () => {
        let query = `DELETE
        FROM usuarios 
        WHERE usuario= 'usuarionormalteste'
        AND senha='25d55ad283aa400af464c76d713c07ad'`;
        await app.sequelize.query(query, { type: Sequelize.QueryTypes.DELETE });
    });
    describe('TESTANDO RESPOSTAS DE SUCESSO...', () => {
        describe('GET :: /auth/token', () => {
            it('Teste na rota de geração do token', async () => {
                const response = await request(app)
                    .get('/auth/token')
                    .send({
                        usuario: 'admin',
                        senha: '12345678'
                    })
                    .expect(200);

                expect(response.body).to.haveOwnProperty('tipo');
                expect(response.body).to.haveOwnProperty('validade');
                expect(response.body).to.haveOwnProperty('token');
            });
        });
        describe('POST :: /usuarios', () => {
            it('Teste na rota de criação do usuário normal', async () => {
                const response = await request(app)
                    .post('/usuarios')
                    .send({
                        usuario: 'usuarionormalteste',
                        senha: '12345678'
                    })
                    .expect(200);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body).to.haveOwnProperty('data');
                expect(response.body.data).to.haveOwnProperty('usuario');
            });
        });
    });
    describe('TESTANDO RESPOSTAS DE ERRO...', () => {
        describe('GET :: /auth/token', () => {
            it('Teste na rota de geração do token, usuário vazio.', async () => {
                const response = await request(app)
                    .get('/auth/token')
                    .send({
                        senha: '12345678'
                    })
                    .expect(401);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message).to.equal('O usuário não pode estar vazio.');
            });
            it('Teste na rota de geração do token, senha vazio.', async () => {
                const response = await request(app)
                    .get('/auth/token')
                    .send({
                        usuario: 'admin'
                    })
                    .expect(401);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message).to.equal('A senha não pode estar vazia.');
            });
            it('Teste na rota de geração do token, usuário incorreto.', async () => {
                const response = await request(app)
                    .get('/auth/token')
                    .send({
                        usuario: '23123@df',
                        senha: '12345678'
                    })
                    .expect(401);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message).to.equal('Usuário ou senha inválido!');
            });
        });
        describe('POST :: /usuarios', () => {
            it('Teste na rota de criação do usuário normal, usuário já cadastrado', async () => {
                const query = `INSERT INTO usuarios (usuario, senha)
                VALUES 
                ('usuarionormalteste', '25d55ad283aa400af464c76d713c07ad')`;
                await app.sequelize.query(query, { type: Sequelize.QueryTypes.INSERT });
                const response = await request(app)
                    .post('/usuarios')
                    .send({
                        usuario: 'usuarionormalteste',
                        senha: '12345678'
                    })
                    .expect(400);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message).to.equal('Usuário já cadastrado!');
            });
            it('Teste na rota de criação do usuário normal, usuário vazio', async () => {
                const response = await request(app)
                    .post('/usuarios')
                    .send({
                        senha: '12345678'
                    })
                    .expect(401);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message).to.equal('O usuário não pode estar vazio.');
            });
            it('Teste na rota de criação do usuário normal, senha vazia', async () => {
                const response = await request(app)
                    .post('/usuarios')
                    .send({
                        usuario: 'usuarionormalteste'
                    })
                    .expect(401);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message).to.equal('A senha não pode estar vazia.');
            });
        });
    });
});