export class Perfil{
  private _id: number;
  private _nome: string;
  private _email: string;
  
  constructor(id: number, nome: string, email: string){
    this._id = id;
    this._nome = nome;
    this._email = email;

  }

  get id(): number{
    return this._id;
  }

  get nome(): string{
    return this._nome;
  }

  get email(): string{
    return this._email;
  }
}
