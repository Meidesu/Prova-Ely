"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RepositorioPerfis = /** @class */ (function () {
    function RepositorioPerfis() {
        this._perfis = [];
    }
    RepositorioPerfis.prototype.incluir = function (perfil) {
        this._perfis.push(perfil);
    };
    RepositorioPerfis.prototype.consultar = function (id, nome, email) {
        for (var _i = 0, _a = this._perfis; _i < _a.length; _i++) {
            var perfil = _a[_i];
            if (perfil.id == id || perfil.nome == nome || perfil.email == email) {
                return perfil;
            }
        }
        return null;
    };
    return RepositorioPerfis;
}());
