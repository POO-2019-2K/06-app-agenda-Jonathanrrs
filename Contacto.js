export default class Contacto {
    constructor(contacto) {
        this._nombre = contacto.nombre.toUpperCase();
        this._fechaNac = contacto.fechaNac;
        this._correo = contacto.correo;
        this._numero = contacto.numero;
        this._mes = [
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun",
            "Jul",
            "Ago",
            "Sep",
            "Oct",
            "Nov",
            "Dic"
          ];
    }
    get nombre() {
        return this._nombre;
    }
    get fechaNac() {
        return this._fechaNac;
    }
    get correo() {
        return this._correo;
    }
    get numero() {
        return this._numero;
    }
    getNacimiento() {
        let fecha = this._fechaNac.getDate() + "/" + this._mes[this._fechaNac.getMonth()] + "/" + this._fechaNac.getFullYear();
        return fecha;
    }
    getEdad() {
        let oneDay = 24 * 60 * 60 * 1000;
        let oneYear = oneDay * 365;
        let differenceMs = new Date() - this._fechaNac;
        let edad = Math.trunc(differenceMs / oneYear);
        return edad;
    }
}