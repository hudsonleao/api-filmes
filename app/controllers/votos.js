const jwt_decode = require('jwt-decode');

module.exports = function (app) {
    const filmes = app.models.filmes;
    const votos = app.models.votos;

    let controller = {};

    controller.votar = async (req, res) => {
        try {
            const { authorization } = req.headers;
            const decoded = jwt_decode(authorization);

            const { id_filme, nota } = req.body;

            if (nota < 0 || nota > 4) return res.status(400).json({ message: 'O valor da nota deve ser entre 0 e 4.' });

            const filme = await filmes.findOne({
                where: {
                    id: id_filme
                }
            });

            if (!filme) return res.status(400).json({ message: 'Filme não encontrado, verifique os dados e tente novamente.' });

            let votou = await votos.findOne({
                where: {
                    filmes_id: id_filme,
                    usuarios_id: decoded.id,
                }
            });

            let mensagem = '';

            if (votou) {
                await votos.update({
                    filmes_id: id_filme,
                    usuarios_id: decoded.id,
                    nota: nota
                }, {
                    where: {
                        id: votou.id
                    }
                });
                mensagem = 'Voto atualizado com sucesso!';
            } else {
                await votos.create({
                    filmes_id: id_filme,
                    usuarios_id: decoded.id,
                    nota: nota,
                });
                mensagem = 'Voto cadastrado com sucesso!'; 
            }

            let notas = await votos.findAll({
                attribute: [
                    'nota'
                ],
                where: {
                    filmes_id: id_filme
                }
            });
            let soma = 0;
            for (const nota of notas) soma = soma + nota.nota;

            const media = parseFloat(soma / notas.length).toFixed(1);

            await filmes.update({
                nota_media: media.toString()
            }, {
                where: {
                    id: id_filme
                }
            });

            return res.status(200).json({
                message: mensagem,
                data: {
                    usuario: decoded.usuario,
                    filme: filme.nome,
                    nota: nota
                }
            });

        } catch (error) {
            /* istanbul ignore next */
            console.error(error);
            /* istanbul ignore next */
            return res.status(500).json({
                message: 'Internal server error',
                stage: 'votar'
            });
        }

    };

    return controller;
};