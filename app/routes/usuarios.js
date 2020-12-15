module.exports = function (app) {
    const controller = app.controllers.usuarios;
    app.route('/admin/usuarios')
        .post(controller.cadastrarAdmin);
    app.route('/admin/usuarios/:usuario')
        .put(controller.alterarUsuario)
        .delete(controller.removerUsuario);
        
    app.route('/usuarios/:usuario')
        .put(controller.alterarUsuario)
        .delete(controller.removerUsuario);
};