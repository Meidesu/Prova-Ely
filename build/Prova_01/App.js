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
                case 3:
                    this.incluirPostagem();
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
            case 0:
                return;
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
    App.prototype.incluirPostagem = function () {
        var perfis = this._redeSocial.obterPerfis();
        var nomesPerfis = [];
        for (var _i = 0, perfis_1 = perfis; _i < perfis_1.length; _i++) {
            var perfil_1 = perfis_1[_i];
            nomesPerfis.push(perfil_1.nome);
        }
        (0, io_utils_1.print)('Escolha o perfil associado: ');
        var indice = (0, io_utils_1.selecao)(nomesPerfis);
        var id = (0, io_utils_1.gerarId)();
        var perfil = perfis[indice - 1];
        var texto = (0, io_utils_1.input)('Texto: ');
        var data = new Date().toLocaleString();
        var hashtags;
        var visualizacoesRestantes;
        var ehAvancada = (0, io_utils_1.simOuNao)('Deseja adicionar hashtags?');
        if (ehAvancada) {
            hashtags = [];
            visualizacoesRestantes = 10;
            var opcao = void 0;
            do {
                hashtags.push((0, io_utils_1.input)('#'));
                opcao = (0, io_utils_1.selecao)(['Adicionar outra']);
            } while (opcao != 0);
        }
        this._redeSocial.criarPostagem(id, texto, data, perfil, 0, 0, hashtags, visualizacoesRestantes);
    };
    return App;
}());
var app = new App();
app.rodarAplicacao();
