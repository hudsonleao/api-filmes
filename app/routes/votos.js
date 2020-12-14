module.exports = function (app) {
    const controller = app.controllers.votos;
    app.route('/votar')
        .post(controller.votar);
};