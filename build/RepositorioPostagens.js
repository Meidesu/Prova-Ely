"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioPostagens = void 0;
var PostagemAvancada_1 = require("./PostagemAvancada");
var RepositorioPostagens = /** @class */ (function () {
    function RepositorioPostagens() {
        this._postagem = [];
        // public consultar(id: number, texto: string, hashtag: string, perfil: Perfil): Postagem[] | null{ 
        //   let posts: Postagem[] = [];
        //   for (let postagem of this._postagem){
        //     if (postagem.id == id || postagem.texto == texto || postagem.perfil == perfil){
        //       posts.push(postagem);
        //       continue;
        //     }
        //     if (postagem instanceof PostagemAvancada){
        //       if ( ( <PostagemAvancada> postagem).existeHashtag(hashtag)){
        //         posts.push(postagem);
        //       }
        //     }
        //   }
        //   return null;
        // }
    }
    RepositorioPostagens.prototype.incluir = function (postagem) {
        this._postagem.push(postagem);
    };
    RepositorioPostagens.prototype.consultar = function (id, texto, hashtag, perfil) {
        var posts = [];
        for (var _i = 0, _a = this._postagem; _i < _a.length; _i++) {
            var postagem = _a[_i];
            if (postagem.id == id || postagem.texto == texto || postagem.perfil == perfil) {
                posts.push(postagem);
                continue;
            }
            if (postagem instanceof PostagemAvancada_1.PostagemAvancada) {
                if (postagem.existeHashtag(hashtag)) {
                    posts.push(postagem);
                }
            }
        }
        return null;
    };
    return RepositorioPostagens;
}());
exports.RepositorioPostagens = RepositorioPostagens;
