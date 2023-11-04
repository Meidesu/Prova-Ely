"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io_utils_1 = require("../utils/io_utils");
var RedeSocial_1 = require("./RedeSocial");
var App = /** @class */ (function () {
    function App() {
        this._redeSocial = new RedeSocial_1.RedeSocial();
    }
    App.prototype.rodarAplicacao = function () {
        var menu = ['asd', 'sadf', 'sdcv'];
        var opcao = (0, io_utils_1.selecao)(menu);
        while (opcao != 0) {
            switch (opcao) {
                case 1:
                    this.incluirPerfil();
                    break;
                case 2:
                    this.consultarPerfil();
                    break;
                default:
                    break;
            }
            (0, io_utils_1.continuar)();
            opcao = (0, io_utils_1.selecao)(menu);
            // this.exibirMenu()
        }
    };
    App.prototype.incluirPerfil = function () {
        var id = (0, io_utils_1.gerarId)();
        var nome = (0, io_utils_1.input)('Nome do perfil: ');
        var email;
        while (this._redeSocial.existePerfil(nome)) {
            (0, io_utils_1.print)('O nome ja esta sendo usado.');
            nome = (0, io_utils_1.input)('Nome do perfil: ');
        }
        email = (0, io_utils_1.inputEmail)('Email valido: ');
        this._redeSocial.criarPerfil(id, nome, email);
    };
    App.prototype.consultarPerfil = function () {
        var menu = ['Pesquisar por ID', 'Pesquisar por nome', 'Pesquisar por email'];
        var opcao = (0, io_utils_1.selecao)(menu);
        var id;
        var nome;
        var email;
        switch (opcao) {
            case 1:
                id = (0, io_utils_1.inputId)('Informe o ID: ');
                break;
            case 2:
                nome = (0, io_utils_1.input)('Informe o nome: ');
                break;
            case 3:
                email = (0, io_utils_1.inputEmail)('Informe o email: ');
                break;
            default:
                break;
        }
        var perfil = this._redeSocial.consultarPerfil(id, nome, email);
        if (perfil) {
            (0, io_utils_1.print)(perfil.id);
            (0, io_utils_1.print)(perfil.nome);
            (0, io_utils_1.print)(perfil.email);
        }
        else {
            (0, io_utils_1.print)("Perfil não encontrado!");
        }
    };
    return App;
}());
var app = new App();
app.rodarAplicacao();
