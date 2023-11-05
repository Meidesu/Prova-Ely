import { PostagemAvancada } from "./PostagemAvancada";
import { Postagem } from "./Postagem";
import { continuar, input, inputInt, limparConsole, print, selecao, inputEmail, gerarId, inputId, simOuNao } from "../utils/io_utils";
import { Perfil } from "./Perfil";
import { RedeSocial } from "./RedeSocial";

class App {
  private _redeSocial: RedeSocial = new RedeSocial();
  
  
  public rodarAplicacao(): void {
    limparConsole();

    let menu: string[] = [
      'Incluir perfil', 
      'Consultar perfil',
      'Incluir Postagem',
      'Consultar postagem',
      'Exibir postagens do perfil'
    ];
    
    let opcao: number = selecao(menu);

    while ( opcao != 0 ){
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

      continuar()
      opcao = selecao(menu)
      // this.exibirMenu()
    }
  }

  public incluirPerfil(): void {
    let id: string = gerarId();
    let nome: string = input('Nome do perfil: ');
    let email: string;    

    while ( this._redeSocial.existePerfil(nome) ) {
      print('O nome ja esta sendo usado.');

      nome = input('Nome do perfil: ');
    }

    email = inputEmail('Email valido: ');

    this._redeSocial.criarPerfil(id, nome, email);

  }

  public consultarPerfil(): void {
    let menu: string[] = ['Pesquisar por ID', 'Pesquisar por nome', 'Pesquisar por email'];
    let opcao: number = selecao(menu);
    
    let id: string|undefined;
    let nome: string|undefined;
    let email: string|undefined;

    switch (opcao) {
      case 1:
        id = inputId('Informe o ID: ');
        
        break;

      case 2:
        nome = input('Informe o nome: ');

        break;

      case 3:
        email = inputEmail('Informe o email: ');

        break;
      case 0:

        return;
        break;
        
      default:
        
        break;
    }
      
    let perfil = this._redeSocial.consultarPerfil(id, nome, email);

    if (perfil){
      print(perfil.toString());

    } else {
      print("Perfil não encontrado!");
      
    }
  }

  public incluirPostagem(): void {
    
    let perfil = this.selecionarPerfil();

    if ( !perfil ){
      print('Nao e possivel criar uma postagem, pois nao ha perfis cadastrados');
      return;
    }

    let id: string = gerarId();
    let texto: string = input('Texto: ');
    let data: string = new Date().toLocaleString();
    let hashtags: string[] | undefined;
    let visualizacoesRestantes: number | undefined;

    let ehAvancada: boolean = simOuNao('Deseja adicionar hashtags?')

    if ( ehAvancada ){
      hashtags = [];
      visualizacoesRestantes = 10;
      let opcao: number;
      
      do {
        hashtags.push(input('#'));

        opcao = selecao(['Adicionar outra']);
      } while ( opcao != 0 );

    }

    this._redeSocial.criarPostagem(id, texto, data, perfil, 0, 0, hashtags, visualizacoesRestantes);
    print('\nPostagem criada com sucesso!');

  }

  public consultarPostagem(): void {

    let menu: string[] = ['Pesquisar por ID', 'Pesquisar por texto', 'Pesquisar por hashtag', 'Pesquisar por perfil'];
    let opcao: number = selecao(menu);
    
    let id: string|undefined;
    let texto: string|undefined;
    let hashtags: string|undefined;
    let perfil: Perfil|undefined;

    do {
      switch (opcao) {
      
        case 1:
          id = inputId('Informe o ID: ');
          
          break;
  
        case 2:
          texto = input('Informe o texto: ');
  
          break;
  
        case 3:
          hashtags = input('Informe a hashtag: #');
  
          break;
        case 4:
          let perfilSelecionado: Perfil|null = this.selecionarPerfil();
  
          if ( !perfilSelecionado ){
            print('Nao e possivel pesquisar por perfil, pois nao ha perfis cadastrados');
            return;
          }

          perfil = perfilSelecionado;

          break;
          
        default:
          break;
      }
      
      opcao = selecao(menu);
    } while (opcao != 0);
    
    let postagem: Postagem[]|null = this._redeSocial.consultarPostagens(id, texto, hashtags, perfil)

    if (postagem){
      postagem.forEach(post => {
        print(post.toString());
        
      });
    } else {
      print("postagem não encontrado!");
      
    }

  }

  public selecionarPerfil(): Perfil | null {
    let perfis: Perfil[] = this._redeSocial.obterPerfis();
  
    if (perfis.length == 0) {

      return null;
    }
    
    let nomesPerfis: string[] = [];

    for ( let perfil of perfis ) {
      nomesPerfis.push(perfil.nome);
    }

    print('Escolha o perfil associado: ');
    let indice: number = selecao(nomesPerfis);

    let perfil: Perfil = perfis[indice-1];

    return perfil;

  }

  public exibirPostagensPorPerfil(): void {
    let perfil: Perfil|null = this.selecionarPerfil();

    if ( !perfil ) {
      print('Nao e possivel pesquisar por perfil, pois nao ha perfis cadastrados');  
      return;
    }

    let postagens: Postagem[] | null = this._redeSocial.exibirPostagensPorPerfil(perfil.id);
    
    if ( !postagens ){
      print('Nao ha postagens nesse perfil')
    } else {
      postagens.forEach(post => {
        print(post.toString());
      });

    }
    
  }
}


let app: App = new App();
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