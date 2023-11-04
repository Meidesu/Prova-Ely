import { Perfil } from "./Perfil";

export class RepositorioPerfis {
  private _perfis: Perfil[] = [];

  public incluir(perfil: Perfil): void{
    this._perfis.push(perfil);
  }

  public consultar(id?: number, nome?: string, email?: string): Perfil | null{ 

    for (let perfil of this._perfis){
      if ( id ){
        if ( perfil.id == id){
          return perfil;
        }
      }

      if ( nome ){
        if ( perfil.nome == nome){
          return perfil;
        }
      } 

      if ( email ){
        if ( perfil.email == email){
          return perfil;
        }
      }
    }

    return null;
  }
}