import { Perfil } from "./Perfil";

export class Postagem {
  private _id: number;
  private _texto: string;
  private _curtidas: number;
  private _descrurtidas: number;
  private _data: string;
  private _perfil: Perfil;

  constructor(id: number, texto: string, curtidas: number, descrurtidas: number, data: string, perfil: Perfil){
    this._id = id;
    this._texto = texto;
    this._curtidas = curtidas;
    this._descrurtidas = descrurtidas;
    this._data = data;
    this._perfil = perfil;
  }

  get id(): number{
    return this._id;
  }

  get texto(): string{
    return this._texto;
  }

  get curtidas(): number{
    return this._curtidas;
  }

  get descrurtidas(): number{
    return this._descrurtidas;
  }

  get data(): string{
    return this._data;
  }

  get perfil(): Perfil{
    return this._perfil;
  }

  public curtir(): void{
    this._curtidas++;
  }

  public descurtir(): void{
    this._descrurtidas++;
  }

  public ehPopular(): boolean{
    return this._curtidas > this._descrurtidas * 1.5;
  }

}