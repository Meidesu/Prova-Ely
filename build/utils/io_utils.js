"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selecao = exports.continuar = exports.limparConsole = exports.print = exports.inputInt = exports.input = void 0;
var readline_sync_1 = require("readline-sync");
function input(label) {
    return (0, readline_sync_1.question)(label);
}
exports.input = input;
function inputInt(label) {
    var numStr = (0, readline_sync_1.question)(label);
    while (isNaN(Number(numStr)) || numStr == '' || Number(numStr) % 1 != 0) {
        print("Valor inválido!");
        numStr = (0, readline_sync_1.question)(label);
    }
    return Number(numStr);
}
exports.inputInt = inputInt;
function print() {
    var parameters = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        parameters[_i] = arguments[_i];
    }
    var out = '';
    for (var _a = 0, parameters_1 = parameters; _a < parameters_1.length; _a++) {
        var p = parameters_1[_a];
        out += "".concat(p, " ");
    }
    console.log(out);
}
exports.print = print;
// Usa a biblioteca readline-sync para pausar a aplicação até que o usuario aperte Enter
function continuar() {
    print();
    (0, readline_sync_1.keyIn)("[Espaco para continuar...]");
    limparConsole();
}
exports.continuar = continuar;
function selecao(opcoes) {
    return (0, readline_sync_1.keyInSelect)(opcoes, ">> ") + 1;
}
exports.selecao = selecao;
function limparConsole() {
    console.clear();
}
exports.limparConsole = limparConsole;
