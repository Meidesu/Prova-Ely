import { Postagem } from "./Postagem";
import { Perfil } from "./Perfil";
import { PostagemAvancada } from "./PostagemAvancada";

export class RepositorioPostagens {
  private _postagem: Postagem[] = [];

  public incluir(postagem: Postagem): void{
    this._postagem.push(postagem);
  }

  public consultar(id?: string, texto?: string, hashtag?: string, perfil?: Perfil): Postagem[] | null{ 
    let posts: Postagem[] = [];

    if ( id ){
      let post = this.consultarId(id);
      if ( post != null){
        posts.push(post);

        return posts;
      }
    }

    for ( let post of this._postagem){
      if ( hashtag){
          if ( post instanceof PostagemAvancada){
            if ( !( <PostagemAvancada> post).existeHashtag(hashtag)){
              continue;
            }
          }
      }

      if ( texto ){
        if ( !post.texto.includes(texto)){
          continue;
        }
      }
      
      if ( perfil ){
        if ( post.perfil != perfil){
          continue;
        }
      }

      posts.push(post);

    }

    if (posts.length == 0){
      return null;
    }

    return posts;
  }

  public consultarId(id: string): Postagem | null {

    for (let postagem of this._postagem){
      if (postagem.id == id){
        return postagem;
      }
    }

    return null;
  }

  public consultarPorHashtag(hashtag: string): PostagemAvancada[]{

    let posts: PostagemAvancada[] = [];

    for (let postagem of this._postagem){
      if (postagem instanceof PostagemAvancada){
        if ( ( <PostagemAvancada> postagem).existeHashtag(hashtag)){
          posts.push(postagem);
        }
      }
    }

    return posts;
  }

  public consultarPorPerfil(perfil: Perfil): Postagem[]{
    let posts: Postagem[] = [];

    for (let postagem of this._postagem){
      if (postagem.perfil == perfil){
        posts.push(postagem);
      }
    }

    // if (posts.length == 0){
    //   return null;
    // }

    return posts;
  }

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

  public existeId(id: string): boolean{
    for (let postagem of this._postagem){
      if (postagem.id == id){
        return true;
      }
    }

    return false;
  }


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