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
        if (id) {
            var post = this.consultarId(id);
            if (post != null) {
                posts.push(post);
                return posts;
            }
        }
        for (var _i = 0, _a = this._postagem; _i < _a.length; _i++) {
            var post = _a[_i];
            if (hashtag) {
                if (post instanceof PostagemAvancada_1.PostagemAvancada) {
                    if (!post.existeHashtag(hashtag)) {
                        continue;
                    }
                }
            }
            if (texto) {
                if (!post.texto.includes(texto)) {
                    continue;
                }
            }
            if (perfil) {
                if (post.perfil != perfil) {
                    continue;
                }
            }
            posts.push(post);
        }
        if (posts.length == 0) {
            return null;
        }
        return posts;
    };
    RepositorioPostagens.prototype.consultarId = function (id) {
        for (var _i = 0, _a = this._postagem; _i < _a.length; _i++) {
            var postagem = _a[_i];
            if (postagem.id == id) {
                return postagem;
            }
        }
        return null;
    };
    RepositorioPostagens.prototype.consultarPorHashtag = function (hashtag) {
        var posts = [];
        for (var _i = 0, _a = this._postagem; _i < _a.length; _i++) {
            var postagem = _a[_i];
            if (postagem instanceof PostagemAvancada_1.PostagemAvancada) {
                if (postagem.existeHashtag(hashtag)) {
                    posts.push(postagem);
                }
            }
        }
        return posts;
    };
    RepositorioPostagens.prototype.consultarPorPerfil = function (perfil) {
        var posts = [];
        for (var _i = 0, _a = this._postagem; _i < _a.length; _i++) {
            var postagem = _a[_i];
            if (postagem.perfil == perfil) {
                posts.push(postagem);
            }
        }
        // if (posts.length == 0){
        //   return null;
        // }
        return posts;
    };
    // public consultarTexto(texto: string): Postagem[] | null{
    //   let posts: Postagem[] = [];
    //   for (let postagem of this._postagem){
    //     if (postagem.texto.includes(texto)){
    //       posts.push(postagem);
    //     }
    //   }
    //   if (posts.length == 0){
    //     return null;
    //   }
    //   return posts;
    // }
    RepositorioPostagens.prototype.existeId = function (id) {
        for (var _i = 0, _a = this._postagem; _i < _a.length; _i++) {
            var postagem = _a[_i];
            if (postagem.id == id) {
                return true;
            }
        }
        return false;
    };
    return RepositorioPostagens;
}());
exports.RepositorioPostagens = RepositorioPostagens;
/*consultar(id: number, texto: string, hashtag: string, perfil: Perfil): Postagem[] {
  return this.postagens.filter(
    (postagem) =>
      (!id || postagem.id === id) &&
      (!texto || postagem.texto.includes(texto)) &&
      (!hashtag || postagem.hashtag === hashtag) &&
      (!perfil || postagem.perfil.id === perfil.id)
  ); */
/*
class RepositorioDePostagens {
private postagens: Postagem[] = [];

incluir(postagem: Postagem): void {
  this.postagens.push(postagem);
}

consultar(id: number, texto: string, hashtag: string, perfil: Perfil): Postagem[] {
  // Crie um array para armazenar as postagens que atendem aos critérios da consulta.
  const postagensFiltradas: Postagem[] = [];

  for (const postagem of this.postagens) {
    // Verifique se a postagem é do tipo PostagemAvancada e se ela corresponde aos critérios.
    if (postagem instanceof PostagemAvancada) {
      const postagemAvancada = postagem as PostagemAvancada;

      // Verifique os critérios de consulta
      const idMatch = id === undefined || postagemAvancada.id === id;
      const textoMatch = texto === undefined || postagemAvancada.texto.includes(texto);
      const hashtagMatch = hashtag === undefined || postagemAvancada.hashtags.includes(hashtag);
      const perfilMatch = perfil === undefined || postagemAvancada.perfil === perfil;

      // Se todos os critérios correspondem, adicione a postagem ao array de postagens filtradas.
      if (idMatch && textoMatch && hashtagMatch && perfilMatch) {
        postagensFiltradas.push(postagem);
      }
    }
  }

  return postagensFiltradas;
}
}

*/ 
