const jwt_decode = require('jwt-decode');
const crypto = require('crypto');
module.exports = function (app) {
    const usuarios = app.models.usuarios;

    let controller = {};

    controller.cadastrarAdmin = async (req, res) => {
        try {
            const { authorization } = req.headers;
            const decoded = jwt_decode(authorization);

            if (decoded.nivel !== 'admin')
                return res.status(401).json({ message: 'Usuário não tem permissão para cadastrar usuários de nível admin.' });

            const { usuario, senha } = req.body;

            if(!usuario) return res.status(400).json({ message: 'O usuário não pode ser vazio.' });
            if(!senha) return res.status(400).json({ message: 'A senha não pode ser vazia.' });

            const senhaCrypto = crypto.createHash('md5').update(senha).digest('hex');

            const usuarioExiste = await usuarios.findOne({
                where: {
                    usuario: usuario
                }
            });

            if (usuarioExiste)
                return res.status(400).json({ message: 'Usuário já cadastrado!' });

            await usuarios.create({
                usuario: usuario,
                senha: senhaCrypto,
                nivel: 'admin',
                ativo: 1
            });

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
                stage: 'cadastrarAdmin'
            });
        }
    };

    controller.alterarUsuario = async (req, res) => {
        try {
            const { authorization } = req.headers;
            const decoded = jwt_decode(authorization);

            const { usuario } = req.params;

            if (decoded.nivel !== 'admin')
                if (usuario !== decoded.usuario)
                    return res.status(401).json({
                        message: 'Seu usuário não tem permissão para editar outros registros. Caso tenha alterado seu usuário recentemente, gere um novo token e tente novamente.'
                    });

            const usuarioCadastrado = await usuarios.findOne({
                where: {
                    usuario: usuario
                }
            });
            if (!usuarioCadastrado)
                return res.status(400).json({ message: 'Usuário não cadastrado!' });

            const { senha, ativo } = req.body;

            if (ativo === 0) return res.status(400).json({ message: 'Para desativar o usuário utilize a rota de remoção.' });
            if (ativo > 1 || ativo < 0) return res.status(400).json({ message: 'Somente o valor 1 é permitido no campo ativo' });

            const novo_usuario = req.body.usuario;

            if (novo_usuario && novo_usuario !== usuario) {
                const usuarioExiste = await usuarios.findOne({
                    where: {
                        usuario: novo_usuario
                    }
                });
                if (usuarioExiste)
                    return res.status(400).json({ message: 'Usuário já existe!' });
            }

            let senhaCrypto;
            if (senha)
                senhaCrypto = crypto.createHash('md5').update(senha).digest('hex');

            const data = {};

            if (novo_usuario) data.usuario = novo_usuario;
            if (senhaCrypto) data.senha = senhaCrypto;
            if (ativo) data.ativo = ativo;

            await usuarios.update(data, {
                where: {
                    usuario: usuario
                }
            });

            return res.status(200).json({
                message: 'Usuário alterado com sucesso!',
                data: {
                    usuario: novo_usuario ? novo_usuario : usuario
                }
            });

        } catch (error) {
            /* istanbul ignore next */
            console.error(error);
            /* istanbul ignore next */
            return res.status(500).json({
                message: 'Internal server error',
                stage: 'alterarUsuario'
            });
        }

    };

    controller.removerUsuario = async (req, res) => {
        try {
            const { authorization } = req.headers;
            const decoded = jwt_decode(authorization);

            const { usuario } = req.params;

            if (decoded.nivel !== 'admin')
                if (usuario !== decoded.usuario)
                    return res.status(401).json({ message: 'Seu usuário não tem permissão para remover outros usuários.' });

            let usuarioExiste = await usuarios.findOne({
                where: {
                    usuario: usuario
                }
            });

            if (!usuarioExiste)
                return res.status(400).json({ message: 'Usuário não existe!' });

            await usuarios.update({
                ativo: 0
            }, {
                where: {
                    id: usuarioExiste.id
                }
            });

            return res.status(200).json({
                message: 'Usuário removido com sucesso!',
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
                stage: 'removerUsuario'
            });
        }
    };

    return controller;
};