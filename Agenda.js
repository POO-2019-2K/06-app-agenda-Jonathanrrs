import Contacto from "./Contacto.js";

export default class Agenda {
    constructor(tablaAgenda) {
        this._tablaAgenda = tablaAgenda;
        this._contactos = [];
        this._initTables();
       
        //localStorage.removeItem("contactos");
    }

    _initTables() {
        let contactos = JSON.parse(localStorage.getItem("contactos"));
        if (contactos === null) {
            return;
        }
        contactos.forEach((contacto, index) => {
            contacto.fechaNac = new Date(contacto.fechaNac);
            this._showInTable(new Contacto(contacto));
            console.log(contacto.fechaNac)
            
        });
    }
    
    _showInTable(contacto) {
        let row = this._tablaAgenda.insertRow(-1);

        let cellNombre = row.insertCell(0);
        let cellFechaNac = row.insertCell(1);
        let cellCorreo = row.insertCell(2);
        let cellEdad = row.insertCell(3);
        row.insertCell(4);

        cellNombre.innerHTML = contacto.nombre;
        cellFechaNac.innerHTML = contacto.getNacimiento();
        cellCorreo.innerHTML = contacto.correo;
        cellEdad.innerHTML = contacto.getEdad();
        this._borrar(row, contacto);

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

    _compararAlfa(a, b) {
        if (a.nombre < b.nombre) {
            return -1;
        }
        if (a.nombre > b.nombre) {
            return 1;
        }
        return 0;

    }
    _compararNum(a,b) {
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
        console.log(this._contactos.sort(this._compararNum))
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
        row.cells[4].innerHTML = "";
        row.cells[4].appendChild(btnBorrar);
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

}
