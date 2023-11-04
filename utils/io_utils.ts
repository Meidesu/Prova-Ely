import { keyIn, keyInPause, keyInSelect, question } from "readline-sync";

function input(label: string): string{
  return question(label);
}

function inputInt(label: string): number{
  let numStr: string = question(label);

  while ( isNaN(Number(numStr)) || numStr == '' ||Number(numStr)%1 != 0){
    print("Valor inválido!")
    numStr = question(label);
  }

  return Number(numStr);
}

function print(...parameters: any): void{

  let out: string = '';

  for ( let p of parameters ){
    out += `${p} `; 
  }

  console.log(out);
}

// Usa a biblioteca readline-sync para pausar a aplicação até que o usuario aperte Enter
function continuar() {
  print()
  keyIn("[Espaco para continuar...]", )

  limparConsole()
}

function selecao(opcoes: string[]){
  return keyInSelect(opcoes, ">> ") + 1;
}

function limparConsole() {
  console.clear();
}

export{input, inputInt, print, limparConsole, continuar, selecao}