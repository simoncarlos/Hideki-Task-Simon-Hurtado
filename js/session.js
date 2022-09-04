class Usuario{
    constructor(id, nombre, contraseña, rol, fotoSrc, tareas){
        this.id = id;
        this.nombre = nombre;
        this.contraseña = contraseña;
        this.rol = rol;
        this.fotoSrc = fotoSrc;
        this.tareas = tareas; //array de tareas que administra el usuario
    }
}

async function getUsuarios(user, password, recordar){
    let arrayUsuarios = [];
    let respuestaUsuarios = await fetch('https://api.jsonstorage.net/v1/json/3569e258-b49a-40c1-9779-2856dadd6bff/9c8901ce-6ddb-434c-826c-790b12f6fd4d');
    let dataUsuarios = await respuestaUsuarios.json();
    arrayUsuarios = await insertarDatosUsuarios( dataUsuarios, arrayUsuarios );
    
    verificarUsuario(user, password, recordar, arrayUsuarios);

}

function insertarDatosUsuarios( dataUsuarios, arrayUsuarios ){

    dataUsuarios.forEach( usuario =>{
        arrayUsuarios.push(new Usuario( usuario.id , usuario.nombre , usuario.contraseña , usuario.rol , usuario.fotoSrc , [...usuario.tareas] ));
    });
    return arrayUsuarios;
}

function guardarEnStorage (user, contraseña, storage){

    localStorage.setItem("usuario", user);
    localStorage.setItem("contraseña", contraseña);
    localStorage.setItem("recordar", storage);
}

function verificarUsuario(user, password, recordar, arrayUsuarios){
    
    let validacion = false;

    arrayUsuarios.forEach( usuario => {

        if(user == usuario.nombre){
            if(password == usuario.contraseña){
                if(recordar.checked){
                    guardarEnStorage( usuario.nombre, usuario.contraseña, true );
                    window.location.assign("pages/task.html");
                    validacion = true;
                }
                else{
                    guardarEnStorage( usuario.nombre, usuario.contraseña, false );
                    window.location.assign("pages/task.html");
                    validacion = true;
                }
            }
        }

    });

    if ( !validacion ){
        Toastify({
            text: "Usuario o contraseña incorrectos",
            duration: 3000,
            newWindow: true,
            gravity: "top",
            position: "right", 
            stopOnFocus: true, 
            style: {
                background: "#fd1f4a",
            },
            onClick: function(){}
        }).showToast()
    }

}

function iniciarSesion(){

    let iniciarSesion = document.getElementById("iniciarSesion"); // Boton de inicio de sesion

    iniciarSesion.addEventListener("click", () => {
        
        let user = document.getElementById("user").value;
        let password = document.getElementById("password").value;
        let recordar = document.getElementById("recordarUsuario");
        getUsuarios(user, password, recordar);

    });

}

function ingresoInvitado(){
    guardarEnStorage( "Invitado", "contraseña", false );
    window.location.assign("pages/task.html");
}

function añadirEventoSesion(){
    
    let ingresarInvitado = document.getElementById("ingresarInvitado");
    let ingresar = document.getElementById("ingresar");

    ingresarInvitado.addEventListener("click",  () =>{
        ingresoInvitado(); 
    });

    ingresar.addEventListener("click", () =>{

        if( localStorage.getItem("recordar") == "true" ){
            window.location.assign("pages/task.html"); 
        }
        else{
            localStorage.clear();
            iniciarSesion();
        }

    });


}

window.onload = () => {
    añadirEventoSesion();
    ( localStorage.getItem("recordar") == "false" ) && localStorage.clear()   
};