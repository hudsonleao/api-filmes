const jwt_decode = require('jwt-decode');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = function (app) {
    const filmes = app.models.filmes;

    let controller = {};

    controller.todosFilmes = async (req, res) => {
        try {
            let { pagina, limite } = req.query;

            if (!pagina) pagina = 1;
            if (!limite) limite = 100;

            const listaFilmes = await filmes.findAll({
                offset: pagina == 0 ? 0 : (parseInt(pagina - 1)) * parseInt(limite),
                limit: parseInt(limite),
            });

            return res.status(200).json({ data: listaFilmes, count: listaFilmes.length });
        } catch (error) {
            /* istanbul ignore next */
            console.error(error);
            /* istanbul ignore next */
            return res.status(500).json({
                message: 'Internal server error',
                stage: 'todosFilmes'
            });
        }
    };

    controller.filtrarFilmes = async (req, res) => {
        try {
            let { pagina, limite } = req.query;
            const { nome, diretor, genero, ator } = req.query;

            let filtro = {};

            if (nome) filtro.nome = { [Op.substring]: nome };
            if (diretor) filtro.diretores = { [Op.substring]: diretor };
            if (genero) filtro.generos = { [Op.substring]: genero };
            if (ator) filtro.atores = { [Op.substring]: ator };

            if (!pagina) pagina = 1;
            if (!limite) limite = 100;

            const listaFilmes = await filmes.findAll({
                where: filtro,
                offset: pagina == 0 ? 0 : (parseInt(pagina - 1)) * parseInt(limite),
                limit: parseInt(limite),
            });
            return res.status(200).json({ data: listaFilmes, count: listaFilmes.length });
        } catch (error) {
            /* istanbul ignore next */
            console.error(error);
            /* istanbul ignore next */
            return res.status(500).json({
                message: 'Internal server error',
                stage: 'filtrarFilmes'
            });
        }
    };

    controller.cadastrarFilmes = async (req, res) => {
        try {
            const { authorization } = req.headers;
            const decoded = jwt_decode(authorization);

            if (decoded.nivel !== 'admin')
                return res.status(401).json({ message: 'Usuário não tem permissão para cadastrar filmes.' });

            const { nome, diretores, generos, atores, resumo } = req.body;

            if (!nome) return res.status(400).json({ message: 'O nome do filme não pode ser vazio.' });

            if (!diretores) return res.status(400).json({ message: 'Os diretores do filme não podem ser vazios.' });
            if (typeof diretores !== 'object')
                return res.status(400).json({ message: 'Diretores devem ser um array' });

            if (!generos) return res.status(400).json({ message: 'Os generos do filme não podem ser vazios.' });
            if (typeof generos !== 'object')
                return res.status(400).json({ message: 'Generos devem ser um array' });

            if (!atores) return res.status(400).json({ message: 'Os atores do filme não podem ser vazios.' });
            if (typeof atores !== 'object')
                return res.status(400).json({ message: 'Atores devem ser um array' });

            if (!resumo) return res.status(400).json({ message: 'O resumo do filme não pode ser vazio.' });

            let diretorString = '';
            let generoString = '';
            let atorString = '';

            for (const diretor of diretores) diretorString += `${diretor}, `;
            for (const genero of generos) generoString += `${genero}, `;
            for (const ator of atores) atorString += `${ator}, `;

            const criado = await filmes.create({
                nome: nome,
                diretores: diretorString.slice(0, -2),
                generos: generoString.slice(0, -2),
                atores: atorString.slice(0, -2),
                resumo: resumo,
                nota_media: 'N/A'
            });

            return res.status(200).json({
                message: 'Filme cadastrado com sucesso!',
                data: criado
            });

        } catch (error) {
            /* istanbul ignore next */
            console.error(error);
            /* istanbul ignore next */
            return res.status(500).json({
                message: 'Internal server error',
                stage: 'cadastrarFilmes'
            });
        }
    };


    return controller;
};