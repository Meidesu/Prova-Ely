import { Postagem } from "./Postagem"
import { Perfil } from "./Perfil"
import { PostagemAvancada } from "./PostagemAvancada"
import { RepositorioPostagens } from "./RepositorioPostagens"
import { RepositorioPerfis } from "./RepositorioPerfis"

export class RedeSocial {
    private repositorioPerfis = new RepositorioPerfis();
    private repositorioPostagens = new RepositorioPostagens();

    incluirPerfil(perfil: Perfil): void {
        if (perfil.id && perfil.nome && perfil.email) {
            this.repositorioPerfis.incluir(perfil);
        }
    }

    consultarPerfil(id: number, nome: string, email: string): Perfil | null {
        return this.repositorioPerfis.consultar(id, nome, email);
    }

    incluirPostagem(postagem: Postagem): void {

        
        if ( !postagem.id || this.repositorioPostagens.existeId(postagem.id)){ 
            return;
        }

        if ( postagem instanceof PostagemAvancada){
            if ( postagem.hashtags.length == 0){
                return;
            }
        }

        if ( !postagem.texto || postagem.texto.length == 0){
            return;
        }

        if ( !postagem.perfil ){
            return;
        }

        this.repositorioPostagens.incluir(postagem);
        
    }

    consultarPostagens(id: number, texto: string, hashtag: string, perfil: Perfil): Postagem[] | null{
        return this.repositorioPostagens.consultar(id, texto, hashtag, perfil);
    }

    curtir(idPostagem: number): void {
        const postagem = this.repositorioPostagens.consultarId(idPostagem);
        if (postagem) {
            postagem.curtir();
        }
    }

    descurtir(idPostagem: number): void {
        const postagem = this.repositorioPostagens.consultarId(idPostagem);
        if (postagem) {
            postagem.descurtir();
        }
    }

    decrementarVisualizacoes(postagens: Postagem[]): void {

        for (let postagem of postagens){
            if (postagem instanceof PostagemAvancada) {
              postagem.decrementarVisualizacoes();
            }
        }
    }

    exibirPostagensPorPerfil(id: number): Postagem[] {
      const perfil: Perfil|null = this.repositorioPerfis.consultar(id);
      let postagens: Postagem[] = [];
      
      if ( perfil ){
        postagens = this.repositorioPostagens.consultarPorPerfil(perfil);

        postagens = postagens.filter(postagem => { if (postagem instanceof PostagemAvancada) {
          return postagem.visualizacoesRestantes <= 0;
        }});

        this.decrementarVisualizacoes(postagens);
      }

      return postagens;
    }
    
    exibirPostagensPorHashtag(hashtag: string): PostagemAvancada[] {
        let postagens: PostagemAvancada[] = this.repositorioPostagens.consultarPorHashtag(hashtag);

        if ( postagens.length == 0){
            return postagens; // Retorna um array vazio se não houver postagens com a hashtag
        }

        postagens = postagens.filter(postagem => {
            return postagem.visualizacoesRestantes <= 0;
        }); // filtra as postagens que não possuem visualizações restantes

        this.decrementarVisualizacoes(postagens); // decrementa as visualizações das postagens

        return postagens; // Retorna o array com as postagens que possuem a hashtag
    }

    /**
    exibirPostagensPorHashtag(hashtag: string): PostagemAvancada[] {
    const postagens = this.consultarPostagens(0, '', hashtag, undefined);
    const postagensExibiveis: PostagemAvancada[] = [];

    for (let i = 0; i < postagens.length; i++) {
        const postagem = postagens[i];
        if (postagem instanceof PostagemAvancada) {
            this.decrementarVisualizacoes(postagem);
                if (postagem.visualizacoes > 0) {
                    postagensExibiveis.push(postagem);
                }
            }
        }

        return postagensExibiveis;
    }
     * 
     */
      
}   