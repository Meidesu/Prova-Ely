"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io_utils_1 = require("../utils/io_utils");
var RedeSocial_1 = require("./RedeSocial");
var App = /** @class */ (function () {
    function App() {
        this._redeSocial = new RedeSocial_1.RedeSocial();
        // public exibirMenu(): void {
        // }
    }
    App.prototype.rodarAplicacao = function () {
        var menu = ['asd', 'sadf', 'sdcv'];
        var opcao = (0, io_utils_1.selecao)(menu);
        while (opcao != 0) {
            switch (opcao) {
                case 1:
                    (0, io_utils_1.print)(this._redeSocial.toString());
                    break;
                default:
                    break;
            }
            (0, io_utils_1.continuar)();
            opcao = (0, io_utils_1.selecao)(menu);
            // this.exibirMenu()
        }
    };
    return App;
}());
var app = new App();
app.rodarAplicacao();
