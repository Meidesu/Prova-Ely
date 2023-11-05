import { continuar, input, inputInt, limparConsole, print, selecao, inputEmail, gerarId, inputId } from "../utils/io_utils";
import { RedeSocial } from "./RedeSocial";

class App {
  private _redeSocial: RedeSocial = new RedeSocial();
  
  
  public rodarAplicacao(): void {
    let menu: string[] = ['asd', 'sadf', 'sdcv'];    
    
    let opcao: number = selecao(menu);

    while ( opcao != 0 ){
      switch (opcao) {
        case 1:
          this.incluirPerfil();

          break;
        case 2:
          this.consultarPerfil();

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
        
      default:
        
        break;
    }
      
    let perfil = this._redeSocial.consultarPerfil(id, nome, email);

    if (perfil){
      print(perfil.id);
      print(perfil.nome);
      print(perfil.email);

    } else {
      print("Perfil não encontrado!");
      
    }

  }
}


let app: App = new App();
app.rodarAplicacao()
