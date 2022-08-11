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

function obtenerUsuarioIngresado(){
    return parseInt(localStorage.getItem("indiceUsuario"));
}

function crearTareas(){
    document.querySelector(".tarea__crear").addEventListener("click", () =>{
        let nuevoId = 1;
        let usuarioIngresado = obtenerUsuarioIngresado();
        if(arrayTareas.length != 0){
            nuevoId = arrayTareas[0].id + 1;
        }
        arrayTareas.unshift(new Tarea( nuevoId , " ", "Terminado" ,   [ 1 , 2 , 3 ] , "6 ene" ,  "19 ene" ,  "Medio" , "Aprobar entrega de interactuar con HTML de javascript" ));
        arrayUsuarios[usuarioIngresado].tareas.push(nuevoId); // Ingresa tarea para poder 
        mostrarTareas();
        document.getElementById(nuevoId).click(); //Se realiza click en el boton apenas creado el evento para modificarlo 
    });
}

function mostrarUsuarios(){
    let container = document.querySelector(".usuarios div");
    let usuarioIngresado = obtenerUsuarioIngresado();
    arrayUsuarios.forEach( usuario => {
        if( arrayUsuarios[ usuarioIngresado ].id != usuario.id ){
        container.innerHTML +=  `<div class="usuarios--perfil" >
                                    <img src="../assets/profiles/${usuario.fotoSrc}">
                                    <article>
                                        <p class="usuario__perfil--nombre">${usuario.nombre}</p>
                                        <p class="usuario__perfil--rol">${usuario.rol}</p>
                                    </article>
                                </div>`;
        }
    });
}

function mostrarUsuarioRegistrado(){
    let perfil = document.querySelector(".menu__perfil img");
    let usuarioIngresado = obtenerUsuarioIngresado();
    perfil.src = "../assets/profiles/"+ arrayUsuarios[ usuarioIngresado ].fotoSrc;

    let nombrePerfil = document.querySelector(".menu__usuario--nombre");
    nombrePerfil.innerHTML = `${arrayUsuarios[usuarioIngresado].nombre}`;
}

function mostrarTareas(){
    let listaTareas = document.querySelector(".tarea__lista");
    listaTareas.innerHTML = " ";
    let usuarioIngresado = obtenerUsuarioIngresado();

    arrayTareas.forEach( element => {
        
        if( arrayUsuarios[ usuarioIngresado ].tareas.includes(element.id) ){

            //inicio if condicional que va a mostrar solo las tareas que coincidan con el usuario iniciado
            let colorPrioridad = "bajo";
            let colorEstado = "proceso";
            // Se asignan a la variables colorPrioridad y colorEstado para luego insertarlas en el HTML como clases, segun su prioridad o estado
            if( element.prioridad == "Alto" ){
                colorPrioridad = "alto";
            }else if( element.prioridad == "Medio" ){
                colorPrioridad = "medio";
            }
        
            if( element.estado == "Terminado" ){
                colorEstado = "terminado";
            }else if( element.estado == "Comenzar" ){
                colorEstado = "hacer";
            }
            // Datos de cada tarea
            listaTareas.innerHTML += `  <div class="tarea__item">
                                            <div class="tarea__nombre">${element.nombre}</div>
                                            <div class="tarea__estado">
                                                <div class="tarea__estado--valor tarea__estado--${colorEstado}">${element.estado}</div>
                                            </div>
                                            <div class="tarea__colaboradores">
                                                <div id="tarea${element.id}" class="tarea__colaboradores--valor">
                                                </div>
                                            </div>
                                            <div class="tarea__fecha">
                                                <div class="tarea__fecha--valor">
                                                    ${element.fin}
                                                </div>
                                            </div>
                                            <div class="tarea__prioridad">
                                                <div class="tarea__prioridad--valor tarea__prioridad--${colorPrioridad}">${element.prioridad}</div>
                                            </div>
                                            <div class="tarea__opciones"> <i id="${element.id}" class='bx bx-edit' data-bs-toggle="modal" data-bs-target="#exampleModal"></i><i id="borrar${element.id}" class='bx bx-trash-alt'></i> </div>
                                        </div>`;

            element.colaboradores.forEach( idColaborador => {
                arrayUsuarios.forEach( usuario =>{
                    if( usuario.id == idColaborador ){ 
                        document.getElementById("tarea"+element.id).innerHTML += `   <div>
                                                                                        <img src="../assets/profiles/${usuario.fotoSrc}">
                                                                                    </div>`;
                    }
                });
            });
            //fin if condicional que va a mostrar solo las tareas que coincidan con el usuario iniciado

        }
    
    });

    modificarTareas();
    eliminarTareas();
}

function modificarTareas(){

    let lista = document.querySelectorAll('.bx-edit');
    let modificar = document.querySelector(".tarea__popup");
    //Una vez guardados en el array "lista", se recorre cada elemento con .bx-edit para añadirle el evento click
    lista.forEach(element => {
        element.addEventListener('click', (e) =>{ 
            //se busca la posicion de la tarea que tenga un id coincidente con el id del .bx-edit para insertar las propiedades del objeto.
            let indicePosicion = arrayTareas.findIndex( position => { 
                return position.id == e.target.id 
            });
            modificar.innerHTML = " ";
            modificar.innerHTML += `<div class="tarea__modificar">  
                                        <i class='bx bx-x-circle' data-bs-dismiss="modal"></i>
                                        <label id="placeholder">Nombre de la tarea</label>
                                        <input type="text" id="nombre" class="tarea__modificar--nombre" value="${arrayTareas[indicePosicion].nombre}">

                                        <p id="placeholder2">Estado</p>
                                        <div class="tarea__modificar--estado">
                                            <input type="radio" name="estado" id="terminado">
                                            <label for="terminado">Terminado</label>

                                            <input type="radio" name="estado" id="enProceso">
                                            <label for="enProceso">En Proceso</label>

                                            <input type="radio" name="estado" checked id="comenzar">
                                            <label for="comenzar">Comenzar</label>
                                        </div>

                                        <label id="placeholder3">Descripcion</label>
                                        <textarea class="tarea__modificar--descripcion"> ${arrayTareas[ indicePosicion ].descripcion} </textarea>

                                        <p id="placeholder4">Prioridad</p>
                                        <div class="tarea__modificar--prioridad">
                                            <input type="radio" name="prioridad" id="alta">
                                            <label for="alta">Alto</label>

                                            <input type="radio" name="prioridad" id="media">
                                            <label for="media">Medio</label>

                                            <input type="radio" name="prioridad" checked id="baja">
                                            <label for="baja">Bajo</label>
                                        </div>
                                        <div class="tarea__participantes">
                                            <p id="placeholder5">Colaboradores</p>
                                            <ul class="tarea__modificar--profiles">
                                            </ul>
                                        </div>
                                    </div>`;            
            // Se recorren los ID de los colaboradores que se encuentra dentro de la propiedad "colaboradores" del cada tarea para luego comparar con los id de la lista de usuarios y devolver su posicion dentro del array de usuarios
            arrayTareas[ indicePosicion ].colaboradores.forEach( element => {
                let posicion = arrayUsuarios.findIndex( usuario => usuario.id == element );
                document.querySelector(".tarea__modificar--profiles").innerHTML += `
                                                <li class="delete${element}">
                                                    <div id="delete${element}" class='bx bx-user-minus'></div>
                                                    <img src="../assets/profiles/${arrayUsuarios[posicion].fotoSrc}">
                                                    <article>
                                                        <p class="tarea__perfil--nombre">${arrayUsuarios[posicion].nombre}</p>
                                                        <p class="tarea__perfil--rol">${arrayUsuarios[posicion].rol}</p>
                                                    </article>
                                                </li>`;
            });

            document.querySelector(".tarea__modificar--profiles").innerHTML += `<p class="tarea__añadir--colaboradores"><i class='bx bx-user-plus' ></i> Añadir colaboradores</p>`;
            // Segun el valor del estado de la tarea, se va a mostrar como checked el que coincida con el del array de las tareas
            if( arrayTareas[ indicePosicion ].estado == "Terminado" ){
                document.getElementById("terminado").checked = true;
            }else if( arrayTareas[ indicePosicion ].estado == "En proceso" ){
                document.getElementById("enProceso").checked = true;
            }
            // Segun el valor de la prioridad de la tarea, se va a mostrar como checked el que coincida con el del array de las tareas
            if( arrayTareas[ indicePosicion ].prioridad == "Alto" ){
                document.getElementById("alta").checked = true;
            }else if( arrayTareas[ indicePosicion ].prioridad == "Medio" ){
                document.getElementById("media").checked = true;
            }
            
            //Escucha de eventos
            let participantes = document.querySelectorAll(".bx-user-minus");//Eliminar colaboradores
            participantes.forEach( participante => {
                participante.addEventListener("click", (e)=>{
                    //alert(e.target.id);
                    let position = arrayTareas[indicePosicion].colaboradores.findIndex((i)=>{
                        let comparacion = "delete" + i;
                        return comparacion == e.target.id
                    });
                    arrayTareas[ indicePosicion ].colaboradores.splice( position , 1);
                    let borrarColaborador = document.querySelector("."+ e.target.id);//arreglar esto
                    borrarColaborador.style.display = "none";
                    mostrarTareas();
                });
            });


            let name = document.querySelector(".tarea__modificar--nombre"); 
            name.addEventListener("change", () => {
                arrayTareas[ indicePosicion ].nombre = name.value;
                mostrarTareas();
            });

            let description = document.querySelector(".tarea__modificar--descripcion");
            description.addEventListener("change", () => {
                arrayTareas[ indicePosicion ].descripcion = description.value;
                mostrarTareas();
            });

            document.querySelectorAll('input[type=radio][name="estado"]').forEach( option => { 
                option.addEventListener('change', () => { //Esta funcion se pude optimizar si se tiene el mismo id como valor de .prioridad, ademas se puede modificar el contenido si se usa .uppercase en la primera letra
                    arrayTareas[ indicePosicion ].estado = "Comenzar";
                    if( option.id == "terminado" ){
                        arrayTareas[ indicePosicion ].estado = "Terminado";
                    }
                    else if( option.id == "enProceso" ){
                        arrayTareas[ indicePosicion ].estado = "En Proceso";
                    }
                    mostrarTareas();
                }); 
            });

            document.querySelectorAll('input[type=radio][name="prioridad"]').forEach( option => { 
                option.addEventListener('change', () => { //Esta funcion se pude optimizar si se tiene el mismo id como valor de .prioridad, ademas se puede modificar el contenido si se usa .uppercase en la primera letra
                    arrayTareas[indicePosicion].prioridad = "Bajo";
                    if( option.id == "alta" ){
                        arrayTareas[indicePosicion].prioridad = "Alto";
                    }
                    else if( option.id == "media" ){
                        arrayTareas[indicePosicion].prioridad = "Medio";
                    }
                    mostrarTareas(); 
                }); 
            });

        });
    });
}

function eliminarTareas(){
    // Se añade el evento de click a cada boton de borrar para eliminar del arrayTareas el elemento cuya posicion coincida con el id de la etiqueta que contiene la clase .bx-trash-alt
    document.querySelectorAll(".bx-trash-alt").forEach( element => {
        element.addEventListener("click", (e) =>{
            let indice = arrayTareas.findIndex( element2 => { 
                let idComparacion = "borrar"+element2.id;
                return idComparacion == e.target.id 
            });
            arrayTareas.splice( indice , 1 );
            mostrarTareas();
        });
    });

}

arrayTareas.unshift(new Tarea( 1 , "Responsive Design", "Terminado" ,   [ 1 , 2 , 3 , 6] ,  "6 ene" ,    "19 ene" ,  "Medio" , "Aprobar entrega de interactuar con HTML de javascript" ));
arrayTareas.unshift(new Tarea( 2 , "Web Development",   "En proceso" ,  [ 2 , 3 , 4 ] ,     "17 ene" ,   "13 feb" ,  "Alto" ,  "Aprobar entrega de interactuar con HTML de javascript" ));
arrayTareas.unshift(new Tarea( 3 , "Databases",         "Comenzar" ,    [ 3 , 5 ] ,         "23 feb" ,   "1 mar" ,   "Bajo" ,  "Aprobar entrega de interactuar con HTML de javascript" ));
arrayTareas.unshift(new Tarea( 4 , "Final Proyect",     "En proceso" ,  [ 4 , 5 , 6 ] ,     "9 may" ,    "19 may" ,  "Medio" , "Aprobar entrega de interactuar con HTML de javascript" ));
arrayTareas.unshift(new Tarea( 5 , "Wireframes",        "Terminado" ,   [ 5 ] ,             "30 may" ,   "5 jun" ,   "Medio" , "Aprobar entrega de interactuar con HTML de javascript" ));
arrayTareas.unshift(new Tarea( 6 , "Entrevistas",       "En proceso" ,  [ 3 , 2 , 5 ] ,     "27 jun" ,   "5 jul" ,   "Alto" ,  "Aprobar entrega de interactuar con HTML de javascript" ));
arrayTareas.unshift(new Tarea( 7 , "Benchmarking",      "Comenzar" ,    [ 1 , 2 , 3 , 5] ,  "1 jul" ,    "3 agos" ,  "Bajo" ,  "Aprobar entrega de interactuar con HTML de javascript" ));
arrayTareas.unshift(new Tarea( 8 , "POV + MVP",         "En proceso" ,  [ 3 , 4 ] ,         "23 agos" ,  "23 sep" ,  "Bajo" ,  "Aprobar entrega de interactuar con HTML de javascript" ));

arrayUsuarios.unshift(new Usuario( 1 , "Solange",   "contraseña" , "Tutora" ,     "1.png" ,  [ 1 , 2 , 3 ]  ));
arrayUsuarios.unshift(new Usuario( 2 , "Florencia", "contraseña" , "Profesora",   "18.png" , [ 2 , 3 , 4 ]  ));
arrayUsuarios.unshift(new Usuario( 3 , "Marco",     "contraseña" , "Tutor" ,      "12.png" , [ 3 , 4 , 5 ]  ));
arrayUsuarios.unshift(new Usuario( 4 , "Diana",     "contraseña" , "Tutora" ,     "19.png" , [ 4 , 5 , 6 ]  ));
arrayUsuarios.unshift(new Usuario( 5 , "Mariano",   "contraseña" , "Coordinador", "13.png" , [ 5 , 6 , 7 ]  ));
arrayUsuarios.unshift(new Usuario( 6 , "Diego",     "contraseña" , "Alumno" ,     "7.png" ,  [ 6 , 7 , 8 ]  ));

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

window.onload = () => {
    
    if( localStorage.getItem("recordar") == "true" ){
        // Se setea en localStorage el indice del usuario que ingresó
        generarIndiceRegistrado();
    }
    else if( localStorage.getItem("recordar") == "false" ){
        generarIndiceRegistrado();

        //window.onhashchange = () => {
        //    localStorage.clear();
        //    alert("Se volvio para atras");
        //};
    }
    else{
        alert("Oops.. debe volver a iniciar sesión");
        window.location.assign("../index.html");
    }
    

    cerrarSesion();
    crearTareas();
    mostrarTareas();
    mostrarUsuarios();
    mostrarUsuarioRegistrado();
    // deberian ir en el if & else if..


};