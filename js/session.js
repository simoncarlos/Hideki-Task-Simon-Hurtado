const arrayTareas = [];
const arrayUsuarios = [];

class Tarea{
    constructor(id, nombre, estado ,colaboradores, inicio, fin, prioridad, descripcion){
        this.id = id;
        this.nombre = nombre;
        this.estado = estado;
        this.colaboradores = colaboradores;
        this.inicio = inicio;
        this.fin = fin;
        this.prioridad = prioridad;
        this.descripcion = descripcion;
    }
}

class Usuario{
    constructor(id, nombre, contraseña, rol, fotoSrc, tareas){
        this.id = id;
        this.nombre = nombre;
        this.contraseña = contraseña;
        this.rol = rol;
        this.fotoSrc= fotoSrc;
        this.tareas = tareas;  //array de tareas asignadas al usuario
    }
}

arrayTareas.unshift(new Tarea( 1 , "Responsive Design", "Terminado" ,   [ 1 , 2 , 3 , 6] ,  "6 ene" ,    "19 ene" ,  "Medio" , "Aprobar entrega de interactuar con HTML de javascript" ));
arrayTareas.unshift(new Tarea( 2 , "Web Development",   "En proceso" ,  [ 2 , 3 , 4 ] ,     "17 ene" ,   "13 feb" ,  "Alto" ,  "Aprobar entrega de interactuar con HTML de javascript" ));
arrayTareas.unshift(new Tarea( 3 , "Databases",         "Comenzar" ,    [ 3 , 5 ] ,         "23 feb" ,   "1 mar" ,   "Bajo" ,  "Aprobar entrega de interactuar con HTML de javascript" ));
arrayTareas.unshift(new Tarea( 4 , "Final Proyect",     "En proceso" ,  [ 4 , 5 , 6 ] ,     "9 may" ,    "19 may" ,  "Medio" , "Aprobar entrega de interactuar con HTML de javascript" ));
arrayTareas.unshift(new Tarea( 5 , "Wireframes",        "Terminado" ,   [ 5 ] ,             "30 may" ,   "5 jun" ,   "Medio" , "Aprobar entrega de interactuar con HTML de javascript" ));
arrayTareas.unshift(new Tarea( 6 , "Entrevistas",       "En proceso" ,  [ 3 , 2 , 5 ] ,     "27 jun" ,   "5 jul" ,   "Alto" ,  "Aprobar entrega de interactuar con HTML de javascript" ));
arrayTareas.unshift(new Tarea( 7 , "Benchmarking",      "Comenzar" ,    [ 1 , 2 , 3 , 5] ,  "1 jul" ,    "3 agos" ,  "Bajo" ,  "Aprobar entrega de interactuar con HTML de javascript" ));
arrayTareas.unshift(new Tarea( 8 , "POV + MVP",         "En proceso" ,  [ 3 , 4 ] ,         "23 agos" ,  "23 sep" ,  "Bajo" ,  "Aprobar entrega de interactuar con HTML de javascript" ));

arrayUsuarios.unshift(new Usuario( 1 , "Solange",   "contraseña" , "Tutora" ,     "1.png" ,  ["1", "2", "3"]  ));
arrayUsuarios.unshift(new Usuario( 2 , "Florencia", "contraseña" , "Profesora",   "18.png" , ["2", "3", "4"]  ));
arrayUsuarios.unshift(new Usuario( 3 , "Marco",     "contraseña" , "Tutor" ,      "12.png" , ["3", "4", "5"]  ));
arrayUsuarios.unshift(new Usuario( 4 , "Diana",     "contraseña" , "Tutora" ,     "19.png" , ["4", "5", "6"]  ));
arrayUsuarios.unshift(new Usuario( 5 , "Mariano",   "contraseña" , "Coordinador", "13.png" , ["5", "6", "7"]  ));
arrayUsuarios.unshift(new Usuario( 6 , "Diego",     "contraseña" , "Alumno" ,     "7.png" ,  ["6", "7", "8"]  ));

function guardarEnStorage (user, contraseña, storage){

    localStorage.setItem("usuario", user);
    localStorage.setItem("contraseña", contraseña);
    localStorage.setItem("recordar", storage);

}

function verificarUsuario(user, password, recordar){
    
    let validacion = false;
    arrayUsuarios.forEach( usuario => {

        if(user.value == usuario.nombre){
            if(password.value == usuario.contraseña){
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

    if( !validacion ){
        alert("Usuario o contraseña incorrectos");
    }

}

function iniciarSesion(){

    let user = document.getElementById("user");
    let password = document.getElementById("password");
    let recordar = document.getElementById("recordarUsuario");

    let iniciarSesion = document.getElementById("iniciarSesion"); // Boton de inicio de sesion

    iniciarSesion.addEventListener("click", () => {
        
        verificarUsuario(user, password, recordar);

    });

}

function añadirEventoSesion(){
    
    let ingresar = document.getElementById("ingresar");

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
};