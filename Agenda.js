import Contacto from "./Contacto.js";
export default class Agenda {
    constructor(tablaAgenda) {
        this._tablaAgenda = tablaAgenda;
        this._contactos = [];
        this._initTables();
    }
    _initTables() {
        let contactos = JSON.parse(localStorage.getItem("contactos"));
        if (contactos === null) {
            return;
        }
        contactos.forEach((contacto, index) => {
            contacto.fechaNac = new Date(contacto.fechaNac);
            this._showInTable(new Contacto(contacto));
        });
    }
    _showInTable(contacto) {
        let row = this._tablaAgenda.insertRow(-1);
        let cellNombre = row.insertCell(0);
        let cellFechaNac = row.insertCell(1);
        let cellCorreo = row.insertCell(2);
        let cellEdad = row.insertCell(3);
        let cellNumero = row.insertCell(4);
        row.insertCell(5);

        cellNombre.innerHTML = contacto.nombre;
        cellFechaNac.innerHTML = contacto.getNacimiento();
        cellCorreo.innerHTML = contacto.correo;
        cellEdad.innerHTML = contacto.getEdad();
        cellNumero.innerHTML = contacto.numero;
        this._borrar(row, contacto);

        let objContacto = {
            nombre: contacto.nombre,
            fechaNac: contacto.fechaNac,
            correo: contacto.correo,
            numero: contacto.numero
        }
        this._contactos.push(objContacto);
    }

    addContacto(contacto) {
        let found = this._findContacto(contacto.correo);
        if (found >= 0) {
            Swal.fire({
                type: "error",
                tittle: "Error",
                text: "El contacto ya existe"
            });
            return;
        }
        this._showInTable(contacto);
        localStorage.setItem("contactos", JSON.stringify(this._contactos));
    }

    _compararAlfa(a, b) {
        if (a.nombre < b.nombre) {
            return -1;
        }
        if (a.nombre > b.nombre) {
            return 1;
        }
        return 0;
    }
    _compararNum(a, b) {
        if (a.fechaNac > b.fechaNac) {
            return -1;
        }
        if (a.fechaNac < b.fechaNac) {
            return 1;
        }
        return 0;
    }

    _alfa() {
        this._contactos.sort(this._compararAlfa);
    }
    _num() {
        this._contactos.sort(this._compararNum);
    }

    mostrarAlfa() {
        this._contactos.sort(this._compararAlfa);
        localStorage.setItem("contactos", JSON.stringify(this._contactos));
        location.reload();
    }
    mostrarNum() {
        this._contactos.sort(this._compararNum);
        localStorage.setItem("contactos", JSON.stringify(this._contactos));
        location.reload();
    }
    _borrar(row, contacto) {
        let btnBorrar = document.createElement("input");
        btnBorrar.type = "button";
        btnBorrar.value = "Borrar";
        btnBorrar.className = "btn btn-danger";
        row.cells[5].innerHTML = "";
        row.cells[5].appendChild(btnBorrar);
        btnBorrar.addEventListener("click", () => {
            this._borrarRow(contacto);
        });
    }

    _borrarRow(contacto) {
        this._contactos = JSON.parse(localStorage.getItem("contactos"));
        this._contactos.forEach((e, index) => {
            if (e.nombre === contacto.nombre) {
                this._contactos.splice(index, 1);
            }
        });
        location.reload();
        localStorage.setItem("contactos", JSON.stringify(this._contactos));
    }
    _findContacto(correo) {
        let foundAt = -1;
        this._contactos.forEach((e, index) => {
            if (e.correo === correo) {
                foundAt = index;
                return;
            }
        });
        return foundAt;
    }
}
