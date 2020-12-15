/*eslint-disable */
const { expect } = require('chai');
const request = require('supertest');
const app = require('../../app');
const Sequelize = require('sequelize');

describe('TESTANDO ROTAS USUÁRIOS...', () => {
    let token;
    beforeEach(async () => {
        const response = await request(app)
            .get('/api/v1/auth/token')
            .send({ usuario: 'admin', senha: '12345678' })
            .expect(200);
        token = response.body.token;

        let query = `DELETE
        FROM usuarios 
        WHERE usuario='usuariotesteadmin'
        OR usuario='usuariotestenormal'`
        await app.sequelize.query(query, { type: Sequelize.QueryTypes.DELETE });
    });

    afterEach(async () => {
        let query = `DELETE
        FROM usuarios 
        WHERE usuario='usuariotesteadmin'
        OR usuario='usuariotestenormal'`
        await app.sequelize.query(query, { type: Sequelize.QueryTypes.DELETE });
    });

    describe('TESTANDO RESPOSTAS DE SUCESSO...', () => {
        describe('POST :: /api/v1/admin/usuarios', () => {
            it('Teste na rota para cadastrar usuário admin, token Admin', async () => {

                const response = await request(app)
                    .post('/api/v1/admin/usuarios')
                    .set('authorization', `Bearer ${token}`)
                    .send({
                        usuario: "usuariotesteadmin",
                        senha: "12345678"
                    })
                    .expect(200);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message).to.equal('Usuário cadastrado com sucesso!');
                expect(response.body).to.haveOwnProperty('data');
                expect(response.body.data.usuario).to.equal('usuariotesteadmin');
            });
        });
        describe('PUT :: /api/v1/admin/usuarios/:usuario', async () => {

            it('Teste na rota para alterar usuário cadastrado', async () => {
                const query = `INSERT INTO usuarios (usuario, senha)
                VALUES 
                ('usuariotesteadmin', '25d55ad283aa400af464c76d713c07ad')`;
                await app.sequelize.query(query, { type: Sequelize.QueryTypes.INSERT });
                const response = await request(app)
                    .put('/api/v1/admin/usuarios/usuariotesteadmin')
                    .set('authorization', `Bearer ${token}`)
                    .send({
                        usuario: "usuariotesteadmin",
                        senha: "novasenha"
                    })
                    .expect(200);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message).to.equal('Usuário alterado com sucesso!');
            });
            it('Teste na rota para alterar usuário igual com token de nivel normal', async () => {
                const query = `INSERT INTO usuarios (usuario, senha)
                VALUES 
                ('usuariotesteadmin', '25d55ad283aa400af464c76d713c07ad')`;
                await app.sequelize.query(query, { type: Sequelize.QueryTypes.INSERT });
                const responseToken = await request(app)
                    .get('/api/v1/auth/token')
                    .send({ usuario: 'normal', senha: '12345678' })
                    .expect(200);
                let tokenNormal = responseToken.body.token;

                const response = await request(app)
                    .put('/api/v1/admin/usuarios/normal')
                    .set('authorization', `Bearer ${tokenNormal}`)
                    .send({
                        usuario: "normal",
                        senha: "12345678"
                    })
                    .expect(200);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message).to.equal('Usuário alterado com sucesso!');
            });
            it('Teste na rota para alterar usuário que já existe', async () => {

                const query = `INSERT INTO usuarios (usuario, senha)
                VALUES 
                ('usuariotesteput', '25d55ad283aa400af464c76d713c07ad')`;
                await app.sequelize.query(query, { type: Sequelize.QueryTypes.INSERT });

                const response = await request(app)
                    .put('/api/v1/admin/usuarios/usuariotesteput')
                    .set('authorization', `Bearer ${token}`)
                    .send({
                        usuario: "usuariotesteadmin",
                        senha: "novasenha"
                    })
                    .expect(200);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message).to.equal('Usuário alterado com sucesso!');
            });
            it('Teste na rota para alterar usuário que já existe, mas sem o campo usuario', async () => {

                const query = `INSERT INTO usuarios (usuario, senha)
                VALUES 
                ('usuariotesteput', '25d55ad283aa400af464c76d713c07ad')`;
                await app.sequelize.query(query, { type: Sequelize.QueryTypes.INSERT });

                const response = await request(app)
                    .put('/api/v1/admin/usuarios/usuariotesteput')
                    .set('authorization', `Bearer ${token}`)
                    .send({
                        senha: "novasenha"
                    })
                    .expect(200);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message).to.equal('Usuário alterado com sucesso!');
            });
            it('Teste na rota para alterar usuário que já existe, mas sem o campo senha', async () => {

                const query = `INSERT INTO usuarios (usuario, senha)
                VALUES 
                ('usuariotesteput', '25d55ad283aa400af464c76d713c07ad')`;
                await app.sequelize.query(query, { type: Sequelize.QueryTypes.INSERT });

                const response = await request(app)
                    .put('/api/v1/admin/usuarios/usuariotesteput')
                    .set('authorization', `Bearer ${token}`)
                    .send({
                        usuario: "usuariotesteadmin"
                    })
                    .expect(200);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message).to.equal('Usuário alterado com sucesso!');
            });
            it('Teste na rota para alterar usuário que já existe, com campo ativo = 1', async () => {

                const query = `INSERT INTO usuarios (usuario, senha)
                VALUES 
                ('usuariotesteput', '25d55ad283aa400af464c76d713c07ad')`;
                await app.sequelize.query(query, { type: Sequelize.QueryTypes.INSERT });

                const response = await request(app)
                    .put('/api/v1/admin/usuarios/usuariotesteput')
                    .set('authorization', `Bearer ${token}`)
                    .send({
                        usuario: "usuariotesteadmin",
                        senha: "novasenha",
                        ativo: 1
                    })
                    .expect(200);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message).to.equal('Usuário alterado com sucesso!');
            });
        });
        describe('DELETE :: /api/v1/admin/usuarios/:usuario', async () => {
            it('Teste na rota para excluir usuário', async () => {

                const query = `INSERT INTO usuarios (usuario, senha)
                VALUES 
                ('usuariotesteadmin', '25d55ad283aa400af464c76d713c07ad')`;
                await app.sequelize.query(query, { type: Sequelize.QueryTypes.INSERT });

                const response = await request(app)
                    .delete('/api/v1/admin/usuarios/usuariotesteadmin')
                    .set('authorization', `Bearer ${token}`)
                    .expect(200);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message).to.equal('Usuário removido com sucesso!');
            });
        });
        it('Teste na rota para excluir usuário, usuário removendo ele mesmo', async () => {
            const query = `INSERT INTO usuarios (usuario, senha, nivel)
            VALUES 
            ('usuariotestenormal', '25d55ad283aa400af464c76d713c07ad', 'normal')`;
            await app.sequelize.query(query, { type: Sequelize.QueryTypes.INSERT });
            const responseToken = await request(app)
                .get('/api/v1/auth/token')
                .send({ usuario: 'usuariotestenormal', senha: '12345678' })
                .expect(200);
            let tokenNormal = responseToken.body.token;

            const response = await request(app)
                .delete('/api/v1/admin/usuarios/usuariotestenormal')
                .set('authorization', `Bearer ${tokenNormal}`)
                .expect(200);

            expect(response.body).to.haveOwnProperty('message');
            expect(response.body.message).to.equal('Usuário removido com sucesso!');
        })
    });

    describe('TESTANDO RESPOSTAS DE ERRO...', () => {
        describe('POST :: /api/v1/admin/usuarios', () => {
            it('Teste na rota para cadastrar usuário admin, token Normal', async () => {
                const responseToken = await request(app)
                    .get('/api/v1/auth/token')
                    .send({ usuario: 'normal', senha: '12345678' })
                    .expect(200);
                let tokenNormal = responseToken.body.token;

                const response = await request(app)
                    .post('/api/v1/admin/usuarios')
                    .set('authorization', `Bearer ${tokenNormal}`)
                    .send({
                        usuario: "usuariotesteadmin",
                        senha: "12345678"
                    })
                    .expect(401);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message).to.equal('Usuário não tem permissão para cadastrar usuários de nível admin.');
            })
            it('Teste na rota para cadastrar usuário admin, usuario já existe', async () => {

                const query = `INSERT INTO usuarios (usuario, senha)
                VALUES 
                ('usuariotesteadmin', '25d55ad283aa400af464c76d713c07ad')`;
                await app.sequelize.query(query, { type: Sequelize.QueryTypes.INSERT });

                const response = await request(app)
                    .post('/api/v1/admin/usuarios')
                    .set('authorization', `Bearer ${token}`)
                    .send({
                        usuario: "usuariotesteadmin",
                        senha: "12345678"
                    })
                    .expect(400);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message).to.equal('Usuário já cadastrado!');
            });
            it('Teste na rota para cadastrar usuário admin, usuário vazio', async () => {

                const response = await request(app)
                    .post('/api/v1/admin/usuarios')
                    .set('authorization', `Bearer ${token}`)
                    .send({
                        senha: "12345678"
                    })
                    .expect(400);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message).to.equal('O usuário não pode ser vazio.');
            });
            it('Teste na rota para cadastrar usuário admin, senha vazia', async () => {

                const response = await request(app)
                    .post('/api/v1/admin/usuarios')
                    .set('authorization', `Bearer ${token}`)
                    .send({
                        usuario: "usuariotesteadmin"
                    })
                    .expect(400);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message).to.equal('A senha não pode ser vazia.');
            });
        });
        describe('PUT :: /api/v1/admin/usuarios/:usuario', async () => {
            it('Teste na rota para alterar usuário que não está cadastrado', async () => {

                const response = await request(app)
                    .put('/api/v1/admin/usuarios/usuarioteste')
                    .set('authorization', `Bearer ${token}`)
                    .send({
                        usuario: "novousuario",
                        senha: "novasenha"
                    })
                    .expect(400);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message).to.equal('Usuário não cadastrado!');
            });
            it('Teste na rota para alterar usuário que já existe', async () => {

                const query = `INSERT INTO usuarios (usuario, senha)
                VALUES 
                ('usuariotesteadmin', '25d55ad283aa400af464c76d713c07ad')`;
                await app.sequelize.query(query, { type: Sequelize.QueryTypes.INSERT });

                const response = await request(app)
                    .put('/api/v1/admin/usuarios/usuariotesteadmin')
                    .set('authorization', `Bearer ${token}`)
                    .send({
                        usuario: "admin",
                        senha: "novasenha"
                    })
                    .expect(400);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message).to.equal('Usuário já existe!');
            });
            it('Teste na rota para alterar usuário diferente com token de nivel normal', async () => {
                const query = `INSERT INTO usuarios (usuario, senha)
                VALUES 
                ('usuariotesteadmin', '25d55ad283aa400af464c76d713c07ad')`;
                await app.sequelize.query(query, { type: Sequelize.QueryTypes.INSERT });
                const responseToken = await request(app)
                    .get('/api/v1/auth/token')
                    .send({ usuario: 'normal', senha: '12345678' })
                    .expect(200);
                let tokenNormal = responseToken.body.token;

                const response = await request(app)
                    .put('/api/v1/admin/usuarios/usuarioteste')
                    .set('authorization', `Bearer ${tokenNormal}`)
                    .send({
                        usuario: "novousuario",
                        senha: "novasenha"
                    })
                    .expect(401);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message).to.equal('Seu usuário não tem permissão para editar outros registros. Caso tenha alterado seu usuário recentemente, gere um novo token e tente novamente.');
            });
            it('Teste na rota para alterar usuário, campo ativo = 0', async () => {
                const query = `INSERT INTO usuarios (usuario, senha, nivel)
                VALUES 
                ('usuariotesteadmin', '25d55ad283aa400af464c76d713c07ad', 'normal')`;
                await app.sequelize.query(query, { type: Sequelize.QueryTypes.INSERT });

                const response = await request(app)
                    .put('/api/v1/admin/usuarios/usuariotesteadmin')
                    .set('authorization', `Bearer ${token}`)
                    .send({
                        usuario: "usuariotesteadmin",
                        senha: "novasenha",
                        ativo: 0
                    })
                    .expect(400);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message).to.equal('Para desativar o usuário utilize a rota de remoção.');
            });
            it('Teste na rota para alterar usuário, campo ativo = 2', async () => {
                const query = `INSERT INTO usuarios (usuario, senha, nivel)
                VALUES 
                ('usuariotesteadmin', '25d55ad283aa400af464c76d713c07ad', 'normal')`;
                await app.sequelize.query(query, { type: Sequelize.QueryTypes.INSERT });

                const response = await request(app)
                    .put('/api/v1/admin/usuarios/usuariotesteadmin')
                    .set('authorization', `Bearer ${token}`)
                    .send({
                        usuario: "usuariotesteadmin",
                        senha: "novasenha",
                        ativo: 2
                    })
                    .expect(400);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message).to.equal('Somente o valor 1 é permitido no campo ativo');
            });
        });
        describe('DELETE :: /api/v1/admin/usuarios/:usuario', async () => {
            it('Teste na rota para excluir usuário, usuário sem permissão para excluir outro registro', async () => {

                const query = `INSERT INTO usuarios (usuario, senha)
                VALUES 
                ('usuariotesteadmin', '25d55ad283aa400af464c76d713c07ad')`;
                await app.sequelize.query(query, { type: Sequelize.QueryTypes.INSERT });

                const responseToken = await request(app)
                    .get('/api/v1/auth/token')
                    .send({ usuario: 'normal', senha: '12345678' })
                    .expect(200);
                let tokenNormal = responseToken.body.token;

                const response = await request(app)
                    .delete('/api/v1/admin/usuarios/usuariotesteadmin')
                    .set('authorization', `Bearer ${tokenNormal}`)
                    .expect(401);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message).to.equal('Seu usuário não tem permissão para remover outros usuários.');
            })
            it('Teste na rota para excluir usuário, usuário a ser removido não existe', async () => {

                const response = await request(app)
                    .delete('/api/v1/admin/usuarios/usuariotesteadmin')
                    .set('authorization', `Bearer ${token}`)
                    .expect(400);

                expect(response.body).to.haveOwnProperty('message');
                expect(response.body.message).to.equal('Usuário não existe!');
            });
        });
    });
});