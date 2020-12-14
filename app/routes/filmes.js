module.exports = function (app) {
    const controller = app.controllers.filmes;
    app.route('/filmes')
        .get(controller.todosFilmes)
        .post(controller.cadastrarFilmes);
    app.route('/filmes/filtro')
        .get(controller.filtrarFilmes);
};