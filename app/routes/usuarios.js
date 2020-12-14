module.exports = function (app) {
    const controller = app.controllers.usuarios;
    app.route('/admin/cadastrar')
        .post(controller.cadastrarAdmin);
    app.route('/admin/alterar/:usuario')
        .put(controller.alterarUsuario);
    app.route('/admin/remover/:usuario')
        .delete(controller.removerUsuario);
        
    app.route('/usuario/alterar/:usuario')
        .put(controller.alterarUsuario);
    app.route('/usuario/remover/:usuario')
        .delete(controller.removerUsuario);
};