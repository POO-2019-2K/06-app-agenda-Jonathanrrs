import Agenda from "./Agenda.js";
import Contacto from "./Contacto.js";

class Main {
    constructor() {
        let agenda = new Agenda(document.querySelector("#agenda"));
        document.querySelector("#btn").addEventListener("click", () => {
            let form = document.querySelector("#form");
            form.classList.add("was-validated");

            if (form.checkValidity() === true) {
                let nombre = document.querySelector("#nombre").value;
                let sFechaNac = document.querySelector("#fecha").value;
                sFechaNac = sFechaNac.split("-");
                let fechaNac = new Date(sFechaNac[0], sFechaNac[1] - 1, sFechaNac[2]);
                let correo = document.querySelector("#correo").value;
                
                let objContacto = {
                    nombre:  nombre,
                    fechaNac: fechaNac,
                    correo: correo
                }
                
                let contacto = new Contacto(objContacto);
                agenda.addContacto(contacto);

            }
        });
    }
}

let m = new Main();
