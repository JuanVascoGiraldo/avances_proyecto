
const regex_curp = /^[A-Z]{4}[0-9]{6}[HM]{1}[A-Z]{2}[QWRTYPSDFGHJKLZXCVBNM]{3}[A-Z0-9]{1}[0-9]{1}$/;

function monstrar_mensaje_campo_incopleto(campo, nombre, texto) {
    Swal.fire({
        icon: "error",
        title: "Datos",
        text: nombre + " esta incompleto o es incorrecto. " + texto,
    }).then(() => {
        campo.classList.add("invalid_campo");
        setTimeout(() => {
            campo.classList.remove("invalid_campo");
            campo.focus();
        }, 2000);
    });
}

function validar_curp(){
    const curp = document.getElementById('Curp');
    if (curp.value.length==0 || !regex_curp.test(curp.value)) {
        monstrar_mensaje_campo_incopleto(curp, "El CURP", "Recuerda que la CURP debe tener 18 caracteres e ingresa un formato valido");
        return false;
    }
    return true;
}

function validar_password_form() {
    const password = document.getElementById('Password');
    if (password.value.length==0){
        monstrar_mensaje_campo_incopleto(password, "La contraseña", "Recuerda que la contraseña es obligatoria");
        return false
    }
    return true;
}

function validar_formulario() {
    if(!validar_curp()) return;
    if(!validar_password_form()) return;

    Swal.fire({
        icon: "success",
        title: "Datos",
        text: "Datos correctos",
    }).then(() => {
        Swal.fire({
            icon: "success",
            title: "felicidades has sido elegido para el servicio",
            html:`
                <p>Descarga tu acuse de recibo</p>
                <p>Da click en el boton para descargar, recuerda seguir los pasos que indica el archivo para que puedas continuar con tu registro</p>
                <a href="../pdfs/avanceProyectoNov24.pdf" download="Acuse.pdf" class="btn btn-outline-success btn-block">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-download-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.5a.5.5 0 0 1 1 0V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0m-.354 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V11h-1v3.293l-2.146-2.147a.5.5 0 0 0-.708.708z"></path></svg>
                Descargar acuse
                </a>
            `,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Finalizar"
        }).then(() => {
            send_to_index();
        });
    });
}