import { Postagem } from "./Postagem"
import { Perfil } from "./Perfil"
import { PostagemAvancada } from "./PostagemAvancada"
import { RepositorioPostagens } from "./RepositorioPostagens"
import { RepositorioPerfis } from "./RepositorioPerfis"

export class RedeSocial {
    private _repositorioPerfis = new RepositorioPerfis();
    private _repositorioPostagens = new RepositorioPostagens();

    public criarPerfil(id: string, nome: string, email: string): void{
        let novoPerfil: Perfil = new Perfil(id, nome, email);

        this.incluirPerfil(novoPerfil);
    }

    incluirPerfil(perfil: Perfil): void {
        if (perfil.id && perfil.nome && perfil.email) {
            this._repositorioPerfis.incluir(perfil);
        }
    }

    consultarPerfil(id?: string, nome?: string, email?: string): Perfil | null {
        
        return this._repositorioPerfis.consultar(id, nome, email);
    }

    incluirPostagem(postagem: Postagem): void {

        
        if ( !postagem.id || this._repositorioPostagens.existeId(postagem.id)){ 
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

        this._repositorioPostagens.incluir(postagem);
        
    }

    consultarPostagens(id: string, texto: string, hashtag: string, perfil: Perfil): Postagem[] | null{
        return this._repositorioPostagens.consultar(id, texto, hashtag, perfil);
    }

    curtir(idPostagem: string): void {
        const postagem = this._repositorioPostagens.consultarId(idPostagem);
        if (postagem) {
            postagem.curtir();
        }
    }

    descurtir(idPostagem: string): void {
        const postagem = this._repositorioPostagens.consultarId(idPostagem);
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

    exibirPostagensPorPerfil(id: string): Postagem[] {
      const perfil: Perfil|null = this._repositorioPerfis.consultar(id);
      let postagens: Postagem[] = [];
      
      if ( perfil ){
        postagens = this._repositorioPostagens.consultarPorPerfil(perfil);

        postagens = postagens.filter(postagem => { if (postagem instanceof PostagemAvancada) {
          return postagem.visualizacoesRestantes <= 0;
        }});

        this.decrementarVisualizacoes(postagens);
      }

      return postagens;
    }
    
    exibirPostagensPorHashtag(hashtag: string): PostagemAvancada[] {
        let postagens: PostagemAvancada[] = this._repositorioPostagens.consultarPorHashtag(hashtag);

        if ( postagens.length == 0){
            return postagens; // Retorna um array vazio se não houver postagens com a hashtag
        }

        postagens = postagens.filter(postagem => {
            return postagem.visualizacoesRestantes <= 0;
        }); // filtra as postagens que não possuem visualizações restantes

        this.decrementarVisualizacoes(postagens); // decrementa as visualizações das postagens

        return postagens; // Retorna o array com as postagens que possuem a hashtag
    }

    public existePerfil(nome: string): boolean {
        return this._repositorioPerfis.existeNome(nome);
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