function stringContida(texto: string, subtexto: string): boolean {
  return texto.includes(subtexto);
}

// Exemplo de uso:
const texto = "Esta é uma string de exemplo";
const subtexto = "sdfg";
if (stringContida(texto, subtexto)) {
  console.log(`A string "${subtexto}" está contida em "${texto}"`);
} else {
  console.log(`A string "${subtexto}" não está contida em "${texto}"`);
}
