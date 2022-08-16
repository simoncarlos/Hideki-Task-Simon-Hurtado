const arrayTareas = [];
const arrayUsuarios = [];

class Tarea{
    constructor(id, nombre, estado, inicio, fin, prioridad, descripcion, usuarios){
        this.id = id;
        this.nombre = nombre;
        this.estado = estado;
        this.inicio = inicio;
        this.fin = fin;
        this.prioridad = prioridad;
        this.descripcion = descripcion;
        this.usuarios = usuarios; //array con los id de los administradores de las tareas
    }
}

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

arrayTareas.unshift(new Tarea( 1 , "Responsive Design", "Terminado" ,  "1/11/2022",    "19 ene" ,  "Medio" , "Aprobar entrega de interactuar con HTML de javascript" ,   [1 , 2 , 3 , 6]     ));
arrayTareas.unshift(new Tarea( 2 , "Web Development",   "En proceso" , "4/11/2022"  ,   "13 feb" ,  "Alto" ,  "Aprobar entrega de interactuar con HTML de javascript" ,  [2 , 3 , 4 ]        ));
arrayTareas.unshift(new Tarea( 3 , "Databases",         "Comenzar" ,   "10/11/2022"  ,   "1 mar" ,   "Bajo" ,  "Aprobar entrega de interactuar con HTML de javascript" , [3 , 5 ]            ));
arrayTareas.unshift(new Tarea( 4 , "Final Proyect",     "En proceso" , "6/11/2022" ,    "19 may" ,  "Medio" , "Aprobar entrega de interactuar con HTML de javascript" ,  [4 , 5 , 6 ]        ));
arrayTareas.unshift(new Tarea( 5 , "Wireframes",        "Terminado" ,  "26/11/2022"  ,   "5 jun" ,   "Medio" , "Aprobar entrega de interactuar con HTML de javascript" , [5 , 1 , 2, 3 ]     ));
arrayTareas.unshift(new Tarea( 6 , "Entrevistas",       "En proceso" , "20/11/2022"  ,   "5 jul" ,   "Alto" ,  "Aprobar entrega de interactuar con HTML de javascript" , [6 , 3 , 2 , 5 ]    ));
arrayTareas.unshift(new Tarea( 7 , "Benchmarking",      "Comenzar" ,   "24/11/2022" ,    "3 agos" ,  "Bajo" ,  "Aprobar entrega de interactuar con HTML de javascript" , [1 , 2 , 3 , 5]     ));
arrayTareas.unshift(new Tarea( 8 , "POV + MVP",         "En proceso" , "9/11/2022"  ,  "23 sep" ,  "Bajo" ,  "Aprobar entrega de interactuar con HTML de javascript" ,   [2 , 3 , 4 ]        ));

arrayUsuarios.unshift(new Usuario( 1 , "Solange",   "contraseña" , "Tutora" ,     "1.png" ,  [ 1 , 7 , 5 ]            ));
arrayUsuarios.unshift(new Usuario( 2 , "Florencia", "contraseña" , "Profesora",   "18.png" , [ 2 , 8 , 1, 5, 6, 7 ]   ));
arrayUsuarios.unshift(new Usuario( 3 , "Marco",     "contraseña" , "Tutor" ,      "12.png" , [ 3 , 1, 2, 5, 6, 7, 8 ] ));
arrayUsuarios.unshift(new Usuario( 4 , "Diana",     "contraseña" , "Tutora" ,     "19.png" , [ 4 , 2, 8 ]             ));
arrayUsuarios.unshift(new Usuario( 5 , "Mariano",   "contraseña" , "Coordinador", "13.png" , [ 5 , 3, 4, 6, 7 ]       ));
arrayUsuarios.unshift(new Usuario( 6 , "Diego",     "contraseña" , "Alumno" ,     "7.png" ,  [ 6 , 1, 4 ]             ));

// funciones para mostrar tareas

function mostrarTareas(){

    let listaTareas = document.querySelector(".tarea__lista");
    listaTareas.innerHTML = " ";

    arrayUsuarios[ obtenerUsuarioIngresado() ].tareas.forEach( idTarea =>{
        let posicionTarea = obtenerIndiceTarea( idTarea );
        let{ id, nombre, estado, fin, prioridad, usuarios } = arrayTareas[ posicionTarea ];
        
        let colorPrioridad = (prioridad == "Alto") ? "alto" : ( ( prioridad == "Medio" ) ? "medio" : "bajo" );
        let colorEstado = ( estado == "Terminado" ) ? "terminado" : ( ( estado == "Comenzar" ) ? "hacer" : "proceso" );
        listaTareas.innerHTML += `  <div class="tarea__item">
                                            <div class="tarea__nombre">${nombre}</div>
                                            <div class="tarea__estado">
                                                <div class="tarea__estado--valor tarea__estado--${colorEstado}">${estado}</div>
                                            </div>
                                            <div class="tarea__colaboradores">
                                                <div id="colaboradores${id}" class="tarea__colaboradores--valor">
                                                </div>
                                            </div>
                                            <div class="tarea__fecha">
                                                <div class="tarea__fecha--valor">
                                                    ${fin}
                                                </div>
                                            </div>
                                            <div class="tarea__prioridad">
                                                <div class="tarea__prioridad--valor tarea__prioridad--${colorPrioridad}">${prioridad}</div>
                                            </div>
                                            <div class="tarea__opciones"> <i id="editar${id}" class='bx bx-edit' data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i><i id="eliminar${id}" class='bx bx-trash-alt'></i> </div>
                                        </div>`;
        // Agregado iconos de colaboradores dentro de la tarea
        usuarios.forEach( idColaborador => {
            mostrarIconosColaboradores( idColaborador , posicionTarea );
        });
    });
    eliminarTareas();
    modificarTareas();
}

function obtenerIndiceTarea( idTarea ){
    return arrayTareas.findIndex( (tarea) => { return ( tarea.id == idTarea ) });
}

function obtenerIndiceUsuario( idUsuario ){
    return arrayUsuarios.findIndex( (usuario) => { return usuario.id == idUsuario })
}

function mostrarIconosColaboradores( idColaborador, indiceTarea ){
    let posicionColaborador = obtenerIndiceUsuario( idColaborador );
    document.getElementById("colaboradores"+ arrayTareas[indiceTarea].id ).innerHTML += ` <div>
                                                                                <img src="../assets/profiles/${ arrayUsuarios[ posicionColaborador ].fotoSrc }">
                                                                            </div>`;
}

// funciones para eliminar tareas del array tareas y de los usuarios en simultaneo

function eliminarTareas(){
    // Se añade el evento de click a cada boton de borrar para eliminar del arrayTareas el elemento cuya posicion coincida con el id de la etiqueta que contiene la clase .bx-trash-alt
    document.querySelectorAll(".bx-trash-alt").forEach( botonEliminar => {

        botonEliminar.addEventListener("click", (nodoBotonEliminar) =>{

            let idBotonEliminar = nodoBotonEliminar.target.id.replace(/[^0-9]+/g, "");
            let borrarPosicion = obtenerIndiceTarea( idBotonEliminar );
            arrayTareas.splice( borrarPosicion , 1 );
            eliminarTareaDeUsuarios(idBotonEliminar);
            mostrarTareas();

        });

    });

}

function eliminarTareaDeUsuarios( idBotonEliminar ){

    arrayUsuarios.forEach( usuario => {
        
        if ( usuario.tareas.includes( parseInt(idBotonEliminar) ) ){
            eliminarItem(usuario.tareas, idBotonEliminar);
        } 

    });

}

function eliminarItem(tareas, idBotonEliminar){
    let posicionEliminar = tareas.findIndex( tareaAsignada =>{ return tareaAsignada == idBotonEliminar });
    tareas.splice(posicionEliminar, 1);
}   

// funciones para crear tareas

function crearTareas(){
    document.querySelector(".tarea__crear").addEventListener("click", () =>{

        let nuevoId = 1;
        (arrayTareas.length != 0) && ( nuevoId = arrayTareas[0].id + 1 );
        arrayTareas.unshift(new Tarea( nuevoId , "Nueva tarea..", "Terminado" , "23/11/2022" ,  "19 ene" ,  "Medio" , "Aprobar entrega de interactuar con HTML de javascript", [ arrayUsuarios[obtenerUsuarioIngresado()].id ] ));
        arrayUsuarios[ obtenerUsuarioIngresado() ].tareas.unshift(nuevoId);
        mostrarTareas(); 
    });
}

// funciones para modificar tareas

function modificarTareas(){

    let listaBotonesEditar = document.querySelectorAll('.bx-edit');
    let contenedorTarea = document.querySelector(".modal");
    //Una vez guardados en el array "lista", se recorre cada elemento con .bx-edit para añadirle el evento click
    listaBotonesEditar.forEach( botonEditar => {

        botonEditar.addEventListener('click', nodobotonEditar =>{ 
            //se busca la posicion de la tarea que tenga un id coincidente con el id del .bx-edit para insertar las propiedades del objeto.
            let indiceTarea = obtenerIndiceTarea( nodobotonEditar.target.id.replace(/[^0-9]+/g, "") );
            let { nombre, estado , prioridad, descripcion, usuarios} = arrayTareas[indiceTarea];
            contenedorTarea.innerHTML = " ";
            contenedorTarea.innerHTML += `<div class="tarea__modificar">  
                                            <i class='bx bx-x-circle' data-bs-dismiss="modal"></i>
                                            <label id="placeholder">Nombre de la tarea</label>
                                            <input type="text" id="nombre" class="tarea__modificar--nombre" value="${nombre}">

                                            <p id="placeholder2">Estado</p>
                                            <div class="tarea__modificar--estado">
                                                <input type="radio" name="estado" id="terminado">
                                                <label for="terminado">Terminado</label>

                                                <input type="radio" name="estado" id="enProceso">
                                                <label for="enProceso">En Proceso</label>

                                                <input type="radio" name="estado" id="comenzar">
                                                <label for="comenzar">Comenzar</label>
                                            </div>

                                            <label id="placeholder3">Descripcion</label>
                                            <textarea class="tarea__modificar--descripcion"> ${descripcion} </textarea>

                                            <p id="placeholder4">Prioridad</p>
                                            <div class="tarea__modificar--prioridad">
                                                <input type="radio" name="prioridad" id="alta">
                                                <label for="alta">Alto</label>

                                                <input type="radio" name="prioridad" id="media">
                                                <label for="media">Medio</label>

                                                <input type="radio" name="prioridad" id="baja">
                                                <label for="baja">Bajo</label>
                                            </div>
                                            <div class="tarea__participantes">
                                                <p id="placeholder5">Colaboradores</p>
                                                <ul class="tarea__modificar--profiles">
                                                </ul>
                                            </div>
                                            <div class="modal__modificar">
                                                <button id="guardazo" class="modal__guardar">Guardar Cambios</button>
                                                <button class="modal__cancelar" data-bs-dismiss="modal">Cancelar</button>
                                            </div>
                                        </div>`;            
            // Se recorren los ID de los colaboradores que se encuentra dentro de la propiedad "colaboradores" del cada tarea para luego comparar con los id de la lista de usuarios y devolver su posicion dentro del array de usuarios
            usuarios.forEach( colaborador => {
                let posicion = obtenerIndiceUsuario(colaborador);// arrayUsuarios.findIndex( usuario => usuario.id == colaborador );
                let { fotoSrc, nombre, rol } = arrayUsuarios[posicion];
                document.querySelector(".tarea__modificar--profiles").innerHTML += `
                                                <li class="delete${colaborador}">
                                                    <div id="delete${colaborador}" class='bx bx-user-minus'></div>
                                                    <img src="../assets/profiles/${fotoSrc}">
                                                    <article>
                                                        <p class="tarea__perfil--nombre">${nombre}</p>
                                                        <p class="tarea__perfil--rol">${rol}</p>
                                                    </article>
                                                </li>`;
            });
            document.querySelector(".tarea__modificar--profiles").innerHTML += `<a class="tarea__añadir--colaboradores"><i class='bx bx-user-plus' ></i> Añadir colaboradores</a>`;
            
            // Segun el valor del estado de la tarea, se va a mostrar como checked el que coincida con el del array de las tareas

            ( estado == "Terminado" ) ? ( document.getElementById("terminado").checked = true ) : ( ( estado == "En proceso" ) ? ( document.getElementById("enProceso").checked = true ) : ( document.getElementById("comenzar").checked = true ) );
            ( prioridad == "Alto" ) ? ( document.getElementById("alta").checked = true ) : ( ( prioridad == "Medio" ) ? ( document.getElementById("media").checked = true ) : ( document.getElementById("baja").checked = true ) );
            
            //Escucha de eventos
            document.getElementById("guardazo").onclick = () => { verificarModificacion( indiceTarea ) };

        });
    });
}

function verificarModificacion( indiceTarea ){

    let nombreIngresado = document.querySelector(".tarea__modificar--nombre"); 
    let descripcionIngresada = document.querySelector(".tarea__modificar--descripcion");

    if( ( nombreIngresado.value.length != 0 ) && (descripcionIngresada.value.length != 0 ) ){
        guardarCambios( nombreIngresado.value, descripcionIngresada.value, indiceTarea );
        mostrarTareas();
        document.querySelector(".bx-x-circle").click();
    }

}

function guardarCambios( nombreIngresado, descripcionIngresada, indiceTarea  ){

    arrayTareas[ indiceTarea ].nombre = nombreIngresado;
    arrayTareas[ indiceTarea ].descripcion = descripcionIngresada;

    document.querySelectorAll('input[type=radio][name="estado"]').forEach( option => { 
        (option.checked) && ( arrayTareas[ indiceTarea ].estado = (option.id == "terminado") ? ( "Terminado" ) : ( (option.id == "enProceso") ? ( "En Proceso" ) : ("Comenzar") ) )
    
    });

    document.querySelectorAll('input[type=radio][name="prioridad"]').forEach( option => { 
        (option.checked) && (arrayTareas[ indiceTarea ].prioridad = (option.id == "alta") ? ( "Alto" ) : ( (option.id == "media") ? ( "Medio" ) : ("Bajo") ) )
        
    });
}

//funciones para gestionar inicio de sesion

function mostrarUsuarioRegistrado(){
    let perfil = document.querySelector(".menu__perfil img");
    let usuarioIngresado = obtenerUsuarioIngresado();
    perfil.src = "../assets/profiles/"+ arrayUsuarios[ usuarioIngresado ].fotoSrc;

    let nombrePerfil = document.querySelector(".menu__usuario--nombre");
    nombrePerfil.innerHTML = `${arrayUsuarios[usuarioIngresado].nombre}`;
}

function obtenerUsuarioIngresado(){
    return parseInt(localStorage.getItem("indiceUsuario"));
}

function cerrarSesion(){
    let cerrar = document.getElementById("cerrarSesion");
    cerrar.addEventListener("click", () => {
        localStorage.clear();
        window.location.assign("../index.html");
    });
}

function generarIndiceRegistrado(){
    // Trae el indice del usuario ingresado y lo guarda en el Local Storage
    let indexUsuarioRegistrado = arrayUsuarios.findIndex( usuario => {
        return usuario.nombre == localStorage.getItem("usuario") 
    });
    localStorage.setItem("indiceUsuario", indexUsuarioRegistrado);
}

// Inicio de aplicacion

function iniciarAplicacion(){
    cerrarSesion();
    crearTareas();
    mostrarTareas();
    mostrarUsuarioRegistrado();
}

window.onload = () => {
    
    if( localStorage.getItem("recordar") == "true" ){
        // Se setea en localStorage el indice del usuario que ingresó
        generarIndiceRegistrado();
        iniciarAplicacion();
    }
    else if( localStorage.getItem("recordar") == "false" ){
        generarIndiceRegistrado();
        iniciarAplicacion();
    }
    else{
        window.location.assign("../index.html");
    }
    

};