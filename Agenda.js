import Contacto from "./Contacto.js";

export default class Agenda {
    constructor(tablaAgenda) {
        this._tablaAgenda = tablaAgenda;
        this._contactos = [];
        this._initTables();
    }

    _initTables() {
        let contactos = JSON.parse(localStorage.getItem("contactos"));
        if(contactos === null) {
            return;
        }
        contactos.forEach((contacto,index) => {
            contacto.fechaNac = new Date(contacto.fechaNac);
            this._showInTable(new Contacto(contacto));
        })
    }

    _showInTable(contacto) {
        let row = this._tablaAgenda.insertRow(-1);

        let cellNombre = row.insertCell(0);
        let cellFechaNac = row.insertCell(1);
        let cellCorreo = row.insertCell(2);
        let cellEdad = row.insertCell(3);

        cellNombre.innerHTML = contacto.nombre;
        cellFechaNac.innerHTML = contacto.getNacimiento();
        cellCorreo.innerHTML = contacto.correo;
        cellEdad.innerHTML = contacto.getEdad();

        let objContacto = {
            nombre: contacto.nombre,
            fechaNac: contacto.fechaNac,
            correo: contacto.correo
        }
        this._contactos.push(objContacto);
    }

    addContacto(contacto) {
        this._showInTable(contacto);
        localStorage.setItem("contactos", JSON.stringify(this._contactos));
    }
}
