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

arrayTareas.unshift(new Tarea( 1 , "Responsive Design", "Terminado" ,  "1/11/2022",    "2022-08-04" ,  "Medio" , "Aprobar entrega de interactuar con HTML de javascript" ,   [1 , 2 , 3 , 6]     ));
arrayTareas.unshift(new Tarea( 2 , "Web Development",   "En proceso" , "4/11/2022"  ,   "2022-08-04" ,  "Alto" ,  "Aprobar entrega de interactuar con HTML de javascript" ,  [2 , 3 , 4 ]        ));
arrayTareas.unshift(new Tarea( 3 , "Databases",         "Comenzar" ,   "10/11/2022"  ,   "2022-08-04" ,   "Bajo" ,  "Aprobar entrega de interactuar con HTML de javascript" , [3 , 5 ]            ));
arrayTareas.unshift(new Tarea( 4 , "Final Proyect",     "En proceso" , "6/11/2022" ,    "2022-08-04" ,  "Medio" , "Aprobar entrega de interactuar con HTML de javascript" ,  [4 , 5 , 6 ]        ));
arrayTareas.unshift(new Tarea( 5 , "Wireframes",        "Terminado" ,  "26/11/2022"  ,   "2022-08-04" ,   "Medio" , "Aprobar entrega de interactuar con HTML de javascript" , [5 , 1 , 2, 3 ]     ));
arrayTareas.unshift(new Tarea( 6 , "Entrevistas",       "En proceso" , "20/11/2022"  ,   "2022-08-04" ,   "Alto" ,  "Aprobar entrega de interactuar con HTML de javascript" , [6 , 3 , 2 , 5 ]    ));
arrayTareas.unshift(new Tarea( 7 , "Benchmarking",      "Comenzar" ,   "24/11/2022" ,    "2022-08-04" ,  "Bajo" ,  "Aprobar entrega de interactuar con HTML de javascript" , [1 , 2 , 3 , 5]     ));
arrayTareas.unshift(new Tarea( 8 , "POV + MVP",         "En proceso" , "9/11/2022"  ,  "2022-08-04" ,  "Bajo" ,  "Aprobar entrega de interactuar con HTML de javascript" ,   [2 , 3 , 4 ]        ));

arrayUsuarios.unshift(new Usuario( 1 , "Solange",   "contraseña" , "Tutora" ,     "1.png" ,  [ 1 , 7 , 5 ]            ));
arrayUsuarios.unshift(new Usuario( 2 , "Florencia", "contraseña" , "Profesora",   "18.png" , [ 2 , 8 , 1, 5, 6, 7 ]   ));
arrayUsuarios.unshift(new Usuario( 3 , "Marco",     "contraseña" , "Tutor" ,      "12.png" , [ 3 , 1, 2, 5, 6, 7, 8 ] ));
arrayUsuarios.unshift(new Usuario( 4 , "Diana",     "contraseña" , "Tutora" ,     "19.png" , [ 4 , 2, 8 ]             ));
arrayUsuarios.unshift(new Usuario( 5 , "Mariano",   "contraseña" , "Coordinador", "13.png" , [ 5 , 3, 4, 6, 7 ]       ));
arrayUsuarios.unshift(new Usuario( 6 , "Diego",     "contraseña" , "Alumno" ,     "7.png" ,  [ 6 , 1, 4 ]             ));

let graficoLinea;
let graficoDonut;

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
    actualizarGraficos();
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
            confirmarEliminarTarea(nodoBotonEliminar);
        });

    });

}

function confirmarEliminarTarea( nodoBotonEliminar ){
    Swal.fire({
        title: '¿Está seguro que desea eliminar?',
        text: "Una vez borrada la tarea no se puede revertir!",
        icon: 'warning',
        iconColor: '#fbbd0d',
        showCancelButton: true,
        confirmButtonColor: '#04ba71',
        cancelButtonColor: '#fd1f4a',
        cancelButtonText: "Cancelar",
        confirmButtonText: 'Si, borrar!'
    }).then((result) => {
        if (result.isConfirmed) {
            let idBotonEliminar = nodoBotonEliminar.target.id.replace(/[^0-9]+/g, "");
            let borrarPosicion = obtenerIndiceTarea( idBotonEliminar );
            arrayTareas.splice( borrarPosicion , 1 );
            eliminarTareaDeUsuarios(idBotonEliminar);
            mostrarTareas();
            Swal.fire({
                title: '¡Tarea Eliminada!',
                text: 'Su tarea ha sido eliminada con exito.',
                icon: 'success',
                showConfirmButton: false,
                timer: 1800
            })
        }
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
        arrayTareas.unshift(new Tarea( nuevoId , "", "Terminado" , "23/11/2022" ,  "19 ene" ,  "Medio" , "", [ arrayUsuarios[obtenerUsuarioIngresado()].id ] ));
        arrayUsuarios[ obtenerUsuarioIngresado() ].tareas.unshift(nuevoId);
        mostrarTareas(); 
        document.getElementById("editar"+nuevoId).click()
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
            let { nombre, estado, fin, prioridad, descripcion, usuarios} = arrayTareas[indiceTarea];
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

                                            <div class="tarea__calendario">
                                                <p id="placeholder5">Fecha Finalizacion</p>
                                                <input type="date" value="${fin}">
                                            </div>

                                            <div class="tarea__participantes">
                                                <p id="placeholder6">Colaboradores</p>
                                                <ul class="tarea__modificar--profiles">
                                                </ul>
                                            </div>
                                            <div class="modal__modificar">
                                                <button id="salvarCambios" class="modal__guardar">Guardar Cambios</button>
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
            
            ( estado == "Terminado" ) ? ( document.getElementById("terminado").click() ) : ( ( estado == "En proceso" ) ? ( document.getElementById("enProceso").click() ) : ( document.getElementById("comenzar").click() ) );
            ( prioridad == "Alto" )   ? ( document.getElementById("alta").checked = true )      : ( ( prioridad == "Medio" )   ? ( document.getElementById("media").checked = true )     : ( document.getElementById("baja").checked = true ) );
            
            //Escucha de eventos
            document.getElementById("salvarCambios").onclick = () => { verificarModificacion( indiceTarea ) };

        });
    });
}

function verificarModificacion( indiceTarea ){

    let nombreIngresado = document.querySelector(".tarea__modificar--nombre"); 
    let descripcionIngresada = document.querySelector(".tarea__modificar--descripcion");
    let fechaIngresada = document.querySelector(".tarea__calendario input");
    if( ( nombreIngresado.value.length != 0 ) && ( descripcionIngresada.value.length != 0 ) && ( fechaIngresada.value.length != 0 ) ){
        guardarCambios( nombreIngresado.value, descripcionIngresada.value, fechaIngresada.value, indiceTarea );
        mostrarTareas();
        document.querySelector(".bx-x-circle").click();
        Swal.fire({
            title: '¡Cambios Guardados!',
            text: 'Su tareas han sido guardadas y actializadas con exito.',
            icon: 'success',
            showConfirmButton: false,
            timer: 1800
        })
    }
    else{
        Toastify({
            text: "¡Debe completar todos los campos!",
            duration: 3000,
            newWindow: true,
            gravity: "top",
            position: "right", 
            stopOnFocus: true, 
            style: {
                background: "#fd1f4a",
            },
            onClick: function(){}
        }).showToast();
    }

}

function guardarCambios( nombreIngresado, descripcionIngresada,  fechaIngresada, indiceTarea  ){

    arrayTareas[ indiceTarea ].nombre = nombreIngresado;
    arrayTareas[ indiceTarea ].descripcion = descripcionIngresada;
    arrayTareas[ indiceTarea ].fin = fechaIngresada.toLocaleString();
    document.querySelectorAll('input[type=radio][name="estado"]').forEach( option => { 
        (option.checked) && ( arrayTareas[ indiceTarea ].estado = (option.id == "terminado") ? ( "Terminado" ) : ( (option.id == "enProceso") ? ( "En proceso" ) : ("Comenzar") ) )
    
    });

    document.querySelectorAll('input[type=radio][name="prioridad"]').forEach( option => { 
        (option.checked) && (arrayTareas[ indiceTarea ].prioridad = (option.id == "alta") ? ( "Alto" ) : ( (option.id == "media") ? ( "Medio" ) : ("Bajo") ) )
        
    });
}

// funciones de libreria chart.js

function mostrarGraficos(){

    graficoLinea = new Chart( document.getElementById('graficoLinea'), configuracionLinea());
    graficoDonut = new Chart( document.getElementById('graficoDoughnut'), configuracionDoughnut() );

}

function actualizarGraficos(){

    graficoDonut.config.data.datasets[0].data = traerEstadoTareas(); 
    graficoDonut.update();
    graficoLinea.config.data.datasets[0].data = traerPrioridadTareas( "Alto" ); 
    graficoLinea.config.data.datasets[1].data = traerPrioridadTareas( "Medio" );
    graficoLinea.config.data.datasets[2].data = traerPrioridadTareas( "Bajo" );
    graficoLinea.update();
}

function configuracionLinea(){
    return config = {
        type: 'line',
        data: {
            labels: traerNombresUsuarios(),
            datasets: [{
                label: 'Tareas con Prioridad Alta',
                backgroundColor: 'rgba(253, 31, 74, 0.35)',
                borderColor: 'rgb(253, 31, 74)',
                data: traerPrioridadTareas( "Alto" ),
                tension: 0.5,
                fill: true,
                pointBorderWidth: 8,
                borderJoinStyle: 'round'
            },{
                label: 'Tareas con Prioridad Media',
                backgroundColor: 'rgba(228, 51, 151, 0.35)',
                borderColor: 'rgb(251, 189, 13)',
                data: traerPrioridadTareas( "Medio" ),
                tension: 0.5,
                fill: true,
                pointBorderWidth: 8,
                borderJoinStyle: 'round'
            },{
                label: 'Tareas con Prioridad Baja',
                backgroundColor: 'rgba(0, 196, 204, 0.35)',
                borderColor: 'rgb(0, 196, 204)',
                data: traerPrioridadTareas( "Bajo" ),
                tension: 0.5,
                fill: true,
                pointBorderWidth: 8,
                borderJoinStyle: 'round'
            }]
        },
        options: {
            plugins: {
                tooltip:{ enabled: true },
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Prioridad de las tareas de los usuarios:',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                }
            },
            maintainAspectRatio: false,
            responsive: true
        }
    };
}

function configuracionDoughnut(){
    return config = {
        type: 'doughnut',
        data: {
            labels: labels = ['Terminado','En Proceso','Empezar'],
            datasets : [{
                label: 'Estado Tareas',
                data: traerEstadoTareas(),
                borderColor: [
                    'rgb(4, 186, 113)',
                    'rgb(251, 189, 13)',
                    'rgb(228, 51, 151)'
                ],
                backgroundColor: [
                'rgba(4, 186, 113, 0.4)',
                'rgba(251, 189, 13, 0.4)',
                'rgba(228, 51, 151, 0.4)'
                ],
                hoverOffset: 4
            }]
        },
        options: {
            plugins: {
                tooltip:{ enabled: true },
                legend: { position: 'bottom' }
            },
            maintainAspectRatio: false,
            responsive: true
        }
    };
}

function traerNombresUsuarios(){
    let listaUsuarios= [];
    arrayUsuarios.forEach( usuario => {
        listaUsuarios.push(usuario.nombre); 
    });
    return listaUsuarios
}

function traerEstadoTareas(){
    let estadosTareas = [0,0,0];
    arrayUsuarios[ obtenerUsuarioIngresado() ].tareas.forEach( tarea =>{
        let posicionTarea = obtenerIndiceTarea( tarea );
        let { estado } = arrayTareas[ posicionTarea ];
        ( estado == "Terminado" ) ? ( estadosTareas[0]++ ) : ( ( estado == "En proceso" ) ? ( estadosTareas[1]++ ) : ( estadosTareas[2]++ ) );
    });
    return estadosTareas;
}

function traerPrioridadTareas( prioridadGrafico ){
    let prioridadTareas = [];
    arrayUsuarios.forEach( usuario => {
        let cantidadPrioridad = 0;
        usuario.tareas.forEach( tareaAsignada => {
            let prioridad = arrayTareas[ obtenerIndiceTarea(tareaAsignada) ].prioridad;
            ( prioridadGrafico == prioridad ) && ( cantidadPrioridad++ );
        })
        prioridadTareas.push(cantidadPrioridad); 
    });
    return prioridadTareas
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
    mostrarGraficos();
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