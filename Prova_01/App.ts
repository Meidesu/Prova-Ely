
import { continuar, inputInt, limparConsole, print, selecao } from "../utils/io_utils";
import { RedeSocial } from "./RedeSocial";

class App {
  private _redeSocial: RedeSocial = new RedeSocial();
  
  
  public rodarAplicacao(): void {
    let menu: string[] = ['asd', 'sadf', 'sdcv'];    
    
    let opcao: number = selecao(menu);

    while ( opcao != 0 ){
      switch (opcao) {
        case 1:
          print(this._redeSocial.toString()) 

          break;
      
        default:
          break;
      }

      continuar()
      opcao = selecao(menu)
      // this.exibirMenu()
    }
  }

  // public exibirMenu(): void {

  // }

}

let app: App = new App();
app.rodarAplicacao()
