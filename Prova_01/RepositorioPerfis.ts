import { Perfil } from "./Perfil";

class RepositorioPerfis {
  private _perfis: Perfil[] = [];

  public incluir(perfil: Perfil): void{
    this._perfis.push(perfil);
  }

  public consultar(id: number, nome: string, email: string): Perfil | null{ 
    for (let perfil of this._perfis){
      if (perfil.id == id || perfil.nome == nome || perfil.email == email){
        return perfil;
      }
    }

    return null;
  }

}