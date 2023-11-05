export class Perfil{
  private _id: string;
  private _nome: string;
  private _email: string;
  
  constructor(id: string, nome: string, email: string){
    this._id = id;
    this._nome = nome;
    this._email = email;

  }

  get id(): string{
    return this._id;
  }

  get nome(): string{
    return this._nome;
  }

  get email(): string{
    return this._email;
  }
}
