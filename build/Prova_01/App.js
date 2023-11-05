"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io_utils_1 = require("../utils/io_utils");
var RedeSocial_1 = require("./RedeSocial");
var App = /** @class */ (function () {
    function App() {
        this._redeSocial = new RedeSocial_1.RedeSocial();
    }
    App.prototype.rodarAplicacao = function () {
        (0, io_utils_1.limparConsole)();
        var menu = [
            'Incluir perfil',
            'Consultar perfil',
            'Incluir Postagem',
            'Consultar postagem',
            'Exibir postagens do perfil'
        ];
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
                case 4:
                    this.consultarPostagem();
                    break;
                case 5:
                    this.exibirPostagensPorPerfil();
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
            (0, io_utils_1.print)(perfil.toString());
        }
        else {
            (0, io_utils_1.print)("Perfil não encontrado!");
        }
    };
    App.prototype.incluirPostagem = function () {
        var perfil = this.selecionarPerfil();
        if (!perfil) {
            (0, io_utils_1.print)('Nao e possivel criar uma postagem, pois nao ha perfis cadastrados');
            return;
        }
        var id = (0, io_utils_1.gerarId)();
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
        (0, io_utils_1.print)('\nPostagem criada com sucesso!');
    };
    App.prototype.consultarPostagem = function () {
        var menu = ['Pesquisar por ID', 'Pesquisar por texto', 'Pesquisar por hashtag', 'Pesquisar por perfil'];
        var opcao = (0, io_utils_1.selecao)(menu);
        var id;
        var texto;
        var hashtags;
        var perfil;
        do {
            switch (opcao) {
                case 1:
                    id = (0, io_utils_1.inputId)('Informe o ID: ');
                    break;
                case 2:
                    texto = (0, io_utils_1.input)('Informe o texto: ');
                    break;
                case 3:
                    hashtags = (0, io_utils_1.input)('Informe a hashtag: #');
                    break;
                case 4:
                    var perfilSelecionado = this.selecionarPerfil();
                    if (!perfilSelecionado) {
                        (0, io_utils_1.print)('Nao e possivel pesquisar por perfil, pois nao ha perfis cadastrados');
                        return;
                    }
                    perfil = perfilSelecionado;
                    break;
                default:
                    break;
            }
            opcao = (0, io_utils_1.selecao)(menu);
        } while (opcao != 0);
        var postagem = this._redeSocial.consultarPostagens(id, texto, hashtags, perfil);
        if (postagem) {
            postagem.forEach(function (post) {
                (0, io_utils_1.print)(post.toString());
            });
        }
        else {
            (0, io_utils_1.print)("postagem não encontrado!");
        }
    };
    App.prototype.selecionarPerfil = function () {
        var perfis = this._redeSocial.obterPerfis();
        if (perfis.length == 0) {
            return null;
        }
        var nomesPerfis = [];
        for (var _i = 0, perfis_1 = perfis; _i < perfis_1.length; _i++) {
            var perfil_1 = perfis_1[_i];
            nomesPerfis.push(perfil_1.nome);
        }
        (0, io_utils_1.print)('Escolha o perfil associado: ');
        var indice = (0, io_utils_1.selecao)(nomesPerfis);
        var perfil = perfis[indice - 1];
        return perfil;
    };
    App.prototype.exibirPostagensPorPerfil = function () {
        var perfil = this.selecionarPerfil();
        if (!perfil) {
            (0, io_utils_1.print)('Nao e possivel pesquisar por perfil, pois nao ha perfis cadastrados');
            return;
        }
        var postagens = this._redeSocial.exibirPostagensPorPerfil(perfil.id);
        if (!postagens) {
            (0, io_utils_1.print)('Nao ha postagens nesse perfil');
        }
        else {
            postagens.forEach(function (post) {
                (0, io_utils_1.print)(post.toString());
            });
        }
    };
    return App;
}());
var app = new App();
app.rodarAplicacao();
// import { readFileSync, writeFileSync } from 'fs';
// let conteudoDoArquivo = readFileSync("arquivo.txt", "utf-8").split("\n");
// depois percorre conteudoDoArquivo. ele é um array de string, em que cada elemento é uma linha do arquivo.
/*
const conteudoDoArquivo = fs.readFileSync('arquivo.txt', 'utf-8').split('\n');

for (let i = 0; i < conteudoDoArquivo.length; i++) {
  const linha = conteudoDoArquivo[i];
  console.log(`Linha ${i + 1}: ${linha}`);
}
 */ 
