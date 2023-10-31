import { Postagem } from "./Postagem";
import { Perfil } from "./Perfil";
import { PostagemAvancada } from "./PostagemAvancada";

export class RepositorioPostagens {
  private _postagem: Postagem[] = [];

  public incluir(postagem: Postagem): void{
    this._postagem.push(postagem);
  }

  public consultar(id: number, texto: string, hashtag: string, perfil: Perfil): Postagem[] | null{ 
    let posts: Postagem[] = [];
    for (let postagem of this._postagem){
      if (postagem.id == id || postagem.texto == texto || postagem.perfil == perfil){
        posts.push(postagem);
        continue;
      }

      if (postagem instanceof PostagemAvancada){
        if ( ( <PostagemAvancada> postagem).existeHashtag(hashtag)){
          posts.push(postagem);
        }
      }

    }
    return null;
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


