"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RedeSocial_1 = require("./RedeSocial");
var io_utils_1 = require("../utils/io_utils");
var fs_utils_1 = require("../utils/fs_utils");
var PostagemAvancada_1 = require("./PostagemAvancada");
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
            'Exibir postagens do perfil',
            'Carregar dados',
            'Salvar perfis',
            'Carregar postagens',
            'Salvar postagens'
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
                case 6:
                    this.carregarPerfis();
                    break;
                case 7:
                    this.salvarPerfis();
                    break;
                case 8:
                    this.carregarPostagens();
                    break;
                case 9:
                    this.salvarPostagens();
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
    App.prototype.carregarPerfis = function () {
        var linhasPerfil = (0, fs_utils_1.lerArquivo)('../../Prova_01/DataBase/perfis.txt');
        var ocorrencias = 0;
        for (var _i = 0, linhasPerfil_1 = linhasPerfil; _i < linhasPerfil_1.length; _i++) {
            var linha = linhasPerfil_1[_i];
            if (linha == '') {
                continue;
            }
            var dados = linha.split("#");
            var id = dados[0];
            var nome = dados[1];
            var email = dados[2];
            if (!(0, io_utils_1.idValido)(id) || !(0, io_utils_1.ehEmail)(email)) {
                ocorrencias++;
                continue;
            }
            this._redeSocial.criarPerfil(id, nome, email);
        }
        (0, io_utils_1.print)('Dados carregados com sucesso!');
        (0, io_utils_1.print)("Total de ocorrencias: ".concat(ocorrencias));
    };
    App.prototype.salvarPerfis = function () {
        var perfis = this._redeSocial.obterPerfis();
        if (perfis.length == 0) {
            (0, io_utils_1.print)('\nNenhum perfil para salvar!');
            return;
        }
        var dados = '';
        for (var _i = 0, perfis_2 = perfis; _i < perfis_2.length; _i++) {
            var perfil = perfis_2[_i];
            dados += "".concat(perfil.id, "#").concat(perfil.nome, "#").concat(perfil.email, "\n");
        }
        dados = dados.slice(0, -1);
        (0, fs_utils_1.escreverArquivo)('../../Prova_01/DataBase/perfis.txt', dados);
    };
    App.prototype.carregarPostagens = function () {
        var linhasPostagem = (0, fs_utils_1.lerArquivo)('../../Prova_01/DataBase/postagens.txt');
        var ocorrencias = 0;
        for (var _i = 0, linhasPostagem_1 = linhasPostagem; _i < linhasPostagem_1.length; _i++) {
            var linha = linhasPostagem_1[_i];
            if (linha == '') {
                continue;
            }
            var dados = linha.split("#");
            var id = dados[0];
            var texto_1 = dados[1];
            var curtidas = Number(dados[2]);
            var descurtidas = Number(dados[3]);
            var data = dados[4];
            var idPerfil = dados[5];
            var tipo = dados[6];
            var hashtags = void 0;
            var visuRestantes = void 0;
            if (tipo == 'PA') {
                hashtags = dados[7].split('-');
                visuRestantes = Number(dados[8]);
            }
            if (!(0, io_utils_1.idValido)(id) || !(0, io_utils_1.idValido)(idPerfil)) {
                ocorrencias++;
                continue;
            }
            var perfil = this._redeSocial.consultarPerfil(idPerfil);
            if (!perfil)
                continue;
            this._redeSocial.criarPostagem(id, texto_1, data, perfil, curtidas, descurtidas, hashtags, visuRestantes);
        }
        (0, io_utils_1.print)('Postagens carregados com sucesso!');
        (0, io_utils_1.print)("Total de ocorrencias: ".concat(ocorrencias));
    };
    App.prototype.salvarPostagens = function () {
        // 3456YGDE3456Y#texto#curtidas#descurtidas#data#idPerfil#P/PA#hash-hash2-hash3#visurestantes
        var postagens = this._redeSocial.obterPostagens();
        if (!postagens) {
            (0, io_utils_1.print)('\nNenhuma postagem para salvar!');
            return;
        }
        var dados = '';
        for (var _i = 0, postagens_1 = postagens; _i < postagens_1.length; _i++) {
            var post = postagens_1[_i];
            var tipo = 'P';
            dados += "".concat(post.id, "#").concat(post.texto, "#").concat(post.texto, "#").concat(post.curtidas, "#").concat(post.descrurtidas, "#").concat(post.data, "#").concat(post.perfil.id, "\n");
            if (post instanceof PostagemAvancada_1.PostagemAvancada) {
                tipo = 'PA';
                // Dividir as hashtags
                dados += "#".concat(tipo, "#").concat(post.hashtags, "#").concat(post.visualizacoesRestantes, "\n");
            }
            dados += "".concat(tipo, "\n");
        }
        dados = dados.slice(0, -1);
        (0, fs_utils_1.escreverArquivo)('../../Prova_01/DataBase/postagens.txt', dados);
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
/*
1 - excluir perfil
2 - excluir postagem
3 -
*/
