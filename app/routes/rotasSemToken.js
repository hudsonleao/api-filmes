const crypto = require('crypto');
const Sequelize = require('sequelize');
const jsonwebtoken = require('jsonwebtoken');
const jwtSecret = '2423rWFq21fdEr3awr';
module.exports = function (app) {
    let controller = {};

    controller.main = () => {
        app.get('/auth/token', async (req, res) => {
            try {
                const { usuario, senha } = req.body;

                if (!usuario) return res.status(401).json({ message: 'O usuário não pode estar vazio.' });
                if (!senha) return res.status(401).json({ message: 'A senha não pode estar vazia.' });

                const senhaCrypto = crypto.createHash('md5').update(senha).digest('hex');
                const query = `SELECT
                    id,
                    ativo,
                    nivel
                    FROM usuarios 
                    WHERE usuario='${usuario}'
                    AND 
                    senha='${senhaCrypto}'`;
                const userExists = await app.sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

                if (userExists.length > 0 && userExists[0].ativo) {
                    const expire = '24h';
                    const token = jsonwebtoken.sign({ id: userExists[0].id, usuario: usuario, nivel: userExists[0].nivel }, jwtSecret, { expiresIn: expire });
                    return res.status(200).json({
                        tipo: 'Bearer',
                        validade: expire,
                        token: token
                    });
                } else {
                    return res.status(401).json({ message: 'Usuário ou senha inválido!' });
                }
            } catch (error) {
                /* istanbul ignore next */
                console.error(error);
                /* istanbul ignore next */
                return res.status(500).json({
                    message: 'Internal server error',
                    stage: 'getToken'
                });
            }
        });
        app.post('/usuario/cadastrar', async (req, res) => {
            try {
                const { usuario, senha } = req.body;

                if (!usuario) return res.status(401).json({ message: 'O usuário não pode estar vazio.' });
                if (!senha) return res.status(401).json({ message: 'A senha não pode estar vazia.' });

                const senhaCrypto = crypto.createHash('md5').update(senha).digest('hex');
                const query = `SELECT
                    usuario
                    FROM usuarios 
                    WHERE usuario='${usuario}'`;
                const usuarioExiste = await app.sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

                if (usuarioExiste.length > 0)
                    return res.status(400).json({ message: 'Usuário já cadastrado!' });

                const query2 = `INSERT INTO usuarios (usuario, senha, nivel, ativo)
                    VALUES 
                    ('${usuario}', '${senhaCrypto}', 'normal', 1)`;
                await app.sequelize.query(query2, { type: Sequelize.QueryTypes.INSERT });

                return res.status(200).json({
                    message: 'Usuário cadastrado com sucesso!',
                    data: {
                        usuario: usuario
                    }
                });

            } catch (error) {
                /* istanbul ignore next */
                console.error(error);
                /* istanbul ignore next */
                return res.status(500).json({
                    message: 'Internal server error',
                    stage: 'cadastrarUsuario'
                });
            }
        });
    };
    return controller;
};