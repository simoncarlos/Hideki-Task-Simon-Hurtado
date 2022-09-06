class Tarea{
    constructor(id, nombre, estado, inicio, fin, prioridad, descripcion, usuarios){
        this.id = id;
        this.nombre = nombre;
        this.estado = estado;
        this.inicio = inicio;
        this.fin = fin;
        this.prioridad = prioridad;
        this.descripcion = descripcion;
        this.usuarios = usuarios; //array con los id de los usuarios colaboradores
    }
}

class Usuario{
    constructor(id, nombre, contraseña, rol, fotoSrc, tareas){
        this.id = id;
        this.nombre = nombre;
        this.contraseña = contraseña;
        this.rol = rol;
        this.fotoSrc = fotoSrc;
        this.tareas = tareas; //array de tareas que colabora el usuario
    }
}

//funciones de sesion

function obtenerUsuarioIngresado(){
    return parseInt(localStorage.getItem("indiceUsuario"));
}

function mostrarUsuarioRegistrado( arrayUsuarios ){
    let usuarioIngresado = obtenerUsuarioIngresado();
    document.querySelectorAll(".menu__perfil").forEach( perfil => {
        perfil.firstElementChild.firstElementChild.src = "../assets/profiles/"+ arrayUsuarios[ usuarioIngresado ].fotoSrc;
        perfil.lastElementChild.innerHTML = `${arrayUsuarios[usuarioIngresado].nombre}`;
    });
}

function cerrarSesion(){
    document.querySelectorAll(".cerrarSesion").forEach( botonCerrar =>{
        botonCerrar.addEventListener("click", () => {
            localStorage.clear();
            window.location.assign("../index.html");
        });
    });
}

// funciones para eliminar tareas del array tareas y de los usuarios en simultaneo

function obtenerIndiceTarea( arrayTareas, idTarea ){
    return arrayTareas.findIndex( (tarea) => { return ( tarea.id == idTarea ) });
}

function eliminarItem(tareas, idBotonEliminar){
    let posicionEliminar = tareas.findIndex( tareaAsignada =>{ return tareaAsignada == idBotonEliminar });
    tareas.splice(posicionEliminar, 1);
} 

function eliminarTareaDeUsuarios(arrayUsuarios, idBotonEliminar ){
    arrayUsuarios.forEach( usuario => {
        ( usuario.tareas.includes( parseInt(idBotonEliminar) ) ) && eliminarItem(usuario.tareas, idBotonEliminar)
    });
}

function confirmarEliminarTarea( arrayUsuarios, arrayTareas, nodoBotonEliminar, graficoLinea, graficoDonut ){
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
            //Si se confirma, se elimina la tarea del array de tareas y de las tareas que tiene asignadas el usuario
            let idBotonEliminar = nodoBotonEliminar.target.id.replace(/[^0-9]+/g, "");
            let borrarPosicion = obtenerIndiceTarea(arrayTareas, idBotonEliminar );
            arrayTareas.splice( borrarPosicion , 1 );
            eliminarTareaDeUsuarios(arrayUsuarios, idBotonEliminar);
            actualizarDatos( arrayUsuarios, arrayTareas, graficoLinea, graficoDonut );
            Swal.fire({
                title: '¡Tarea Eliminada!',
                text: 'Su tarea ha sido eliminada con exito.',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
        }
    });
}

function eliminarTareas( arrayUsuarios, arrayTareas, graficoLinea, graficoDonut ){
    // Se añade el evento de click a cada boton de borrar para eliminar del arrayTareas el elemento cuya posicion coincida con el id de la etiqueta que contiene la clase .bx-trash-alt
    document.querySelectorAll(".bx-trash-alt").forEach( botonEliminar => {
        botonEliminar.addEventListener("click", (nodoBotonEliminar) =>{
            confirmarEliminarTarea( arrayUsuarios, arrayTareas, nodoBotonEliminar, graficoLinea, graficoDonut);
        });
    });
} 

// funciones para crear tareas

function putDatos( arrayUsuarios, arrayTareas ){
    const urlUsuarios = 'https://api.jsonstorage.net/v1/json/3569e258-b49a-40c1-9779-2856dadd6bff/9c8901ce-6ddb-434c-826c-790b12f6fd4d?apiKey=d1fef2fa-b8d5-48b2-8dae-6dccd49f24ea' 
    fetch(urlUsuarios, {
        method: 'PUT',
        body: JSON.stringify(arrayUsuarios),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    
    const urlTareas = 'https://api.jsonstorage.net/v1/json/3569e258-b49a-40c1-9779-2856dadd6bff/302c1d8e-b5d8-41c9-8e95-8106e0d44709?apiKey=68008529-ac34-4845-9db1-bb1d79362e40'
    fetch(urlTareas, {
        method: 'PUT',
        body: JSON.stringify(arrayTareas),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })

}

function actualizarDatos( arrayUsuarios, arrayTareas, graficoLinea, graficoDonut ){

    putDatos( arrayUsuarios, arrayTareas );
    mostrarTareas( arrayUsuarios, arrayTareas, graficoLinea, graficoDonut );

}

function crearIdTarea( arrayTareas ){
    let nuevoId = 1;
    (arrayTareas.length != 0) && ( nuevoId = arrayTareas[0].id + 1 );
    return nuevoId
}

function crearTareas( arrayUsuarios, arrayTareas, graficoLinea, graficoDonut ){
    document.querySelector(".tarea__crear").addEventListener("click", () =>{
        let nuevoId = crearIdTarea(arrayTareas);
        //Se añadre al "arrayTareas" la nueva tarea creada y se añade la tarea a la lista de tareas del usuario
        arrayTareas.unshift(new Tarea( nuevoId , "", "Terminado" , "23/11/2022" ,  "2022-08-04" ,  "Medio" , "", [ arrayUsuarios[obtenerUsuarioIngresado()].id ] ));
        arrayUsuarios[ obtenerUsuarioIngresado() ].tareas.unshift(nuevoId);

        actualizarDatos( arrayUsuarios, arrayTareas, graficoLinea, graficoDonut);
        document.getElementById("editar"+nuevoId).click()
    });
}

// funciones para modificar tareas

function editarUsuariosColaboradores( arrayUsuarios, arrayTareas, indiceTarea, usuarios, graficoLinea, graficoDonut ){
    //Cuando un usuario colaborador es clickeado, se elimina como colaborador de la tarea, ademas de eliminar esa tarea de la lista del usuario
    let listaEliminarParticipantes = document.querySelectorAll(".bx-user-minus");
    listaEliminarParticipantes.forEach( participantes => {
        participantes.addEventListener("click", (e) => {

            let indiceUsuario = usuarios.indexOf( parseInt(e.target.id.replace(/[^0-9]+/g, "")) );
            usuarios.splice( indiceUsuario , 1);
            
            let indiceBorrarUsuario = arrayUsuarios.findIndex( usuario =>{ return usuario.id == e.target.id.replace(/[^0-9]+/g, "") });
            let posicionBorrar = arrayUsuarios[indiceBorrarUsuario].tareas.indexOf( arrayTareas[indiceTarea].id );
            arrayUsuarios[indiceBorrarUsuario].tareas.splice( posicionBorrar , 1 );

            mostrarUsuariosColaboradores( arrayUsuarios, arrayTareas, indiceTarea, usuarios, graficoLinea, graficoDonut );

            actualizarDatos( arrayUsuarios, arrayTareas, graficoLinea, graficoDonut );
        });
    });
    // Cuando un usuario no colaborador es clickeado, se agrega como colaborador de la tarea, ademas de agregar esa tarea a la lista del usuario
    let listaAñadirParticipantes = document.querySelectorAll(".bx-user-plus");
    listaAñadirParticipantes.forEach( participantes => {
        participantes.addEventListener("click", (e) => {

            let idUsuario = parseInt(e.target.id.replace(/[^0-9]+/g, ""));
            //Se añade ID del nuevo usuario colaborador al array de colaboradores dentro del objeto Tarea
            usuarios.push( idUsuario );
            // Se almacena en indiceAñadirUsuario el indice el usuario al que hay que agregarle la tarea
            let indiceAñadirUsuario = arrayUsuarios.findIndex( usuario =>{ return usuario.id == idUsuario });

            arrayUsuarios[indiceAñadirUsuario].tareas.push( arrayTareas[indiceTarea].id );

            mostrarUsuariosColaboradores( arrayUsuarios, arrayTareas, indiceTarea, usuarios, graficoLinea, graficoDonut );

            actualizarDatos( arrayUsuarios, arrayTareas, graficoLinea, graficoDonut );
        });
    });

}

function mostrarUsuariosColaboradores( arrayUsuarios, arrayTareas, indiceTarea, usuarios, graficoLinea, graficoDonut ){

    document.querySelector(".tarea__modificar--profiles").innerHTML= " ";
    // Se muestran los usuarios colaboradores para poder sacarlos de la lista de colaboradores
    usuarios.forEach( colaborador => {
        if( colaborador != arrayUsuarios[ obtenerUsuarioIngresado() ].id ){

            let posicion = obtenerIndiceUsuario(arrayUsuarios, colaborador);
            let { fotoSrc, nombre, rol } = arrayUsuarios[posicion];
            document.querySelector(".tarea__modificar--profiles").innerHTML += `<li class="usuario${colaborador}">
                                                                                    <div id="delete${colaborador}" class='bx bx-user-minus'></div>
                                                                                    <img src="../assets/profiles/${fotoSrc}">
                                                                                    <article>
                                                                                        <p class="tarea__perfil--nombre">${nombre}</p>
                                                                                        <p class="tarea__perfil--rol">${rol}</p>
                                                                                    </article>
                                                                                </li>`;
        }
    });
    // Se muestran los usuarios que no son colaboradores para poder añadirlos
    let añadirUsuariosColaboradores = document.querySelector(".tarea__modificar--profiles");
    añadirUsuariosColaboradores.innerHTML += `<a class="tarea__añadir--colaboradores">Añadir colaboradores</a>`;
    arrayUsuarios.forEach( usuarioComparador => {
        if( !usuarios.includes(usuarioComparador.id) && (usuarioComparador.id != arrayUsuarios[ obtenerUsuarioIngresado() ].id) ){
            let posicion = obtenerIndiceUsuario(arrayUsuarios, usuarioComparador.id );
            let { fotoSrc, nombre, rol } = arrayUsuarios[posicion];
            añadirUsuariosColaboradores.innerHTML += `<li class="usuario${usuarioComparador.id}">
                                                                                    <div id="delete${usuarioComparador.id}" class='bx bx-user-plus'></div>
                                                                                    <img src="../assets/profiles/${fotoSrc}">
                                                                                    <article>
                                                                                        <p class="tarea__perfil--nombre">${nombre}</p>
                                                                                        <p class="tarea__perfil--rol">${rol}</p>
                                                                                    </article>
                                                                                </li>`;
        };
    });

    editarUsuariosColaboradores( arrayUsuarios, arrayTareas, indiceTarea, usuarios, graficoLinea, graficoDonut );

}

function guardarCambios(arrayTareas, nombreIngresado, descripcionIngresada,  fechaIngresada, indiceTarea  ){

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

function verificarModificacion( arrayUsuarios, arrayTareas, indiceTarea, graficoLinea, graficoDonut ){
    let nombreIngresado = document.querySelector(".tarea__modificar--nombre"); 
    let descripcionIngresada = document.querySelector(".tarea__modificar--descripcion");
    let fechaIngresada = document.querySelector(".tarea__calendario input");
    if( ( nombreIngresado.value.length != 0 ) && ( descripcionIngresada.value.length != 0 ) && ( fechaIngresada.value.length != 0 ) ){
        guardarCambios(arrayTareas, nombreIngresado.value, descripcionIngresada.value, fechaIngresada.value, indiceTarea );
        actualizarDatos( arrayUsuarios, arrayTareas, graficoLinea, graficoDonut );
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

function modificarTareas( arrayUsuarios, arrayTareas, graficoLinea, graficoDonut ){

    let listaBotonesEditar = document.querySelectorAll('.bx-edit');
    let contenedorTarea = document.querySelector(".modal");
    //Una vez guardados en el array "lista", se recorre cada elemento con .bx-edit para añadirle el evento click
    listaBotonesEditar.forEach( botonEditar => {

        botonEditar.addEventListener('click', nodobotonEditar =>{ 
            //se busca la posicion de la tarea que tenga un id coincidente con el id del .bx-edit para insertar las propiedades del objeto.
            let indiceTarea = obtenerIndiceTarea(arrayTareas, nodobotonEditar.target.id.replace(/[^0-9]+/g, "") );
            let {id, nombre, estado, fin, prioridad, descripcion, usuarios} = arrayTareas[indiceTarea];
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
            
            mostrarUsuariosColaboradores( arrayUsuarios, arrayTareas, indiceTarea, usuarios, graficoLinea, graficoDonut );

            // Segun el valor del estado de la tarea, se va a mostrar como checked el que coincida con el del array de las tareas
            
            ( estado == "Terminado" ) ? ( document.getElementById("terminado").click() ) : ( ( estado == "En proceso" ) ? ( document.getElementById("enProceso").click() ) : ( document.getElementById("comenzar").click() ) );
            ( prioridad == "Alto" )   ? ( document.getElementById("alta").checked = true )      : ( ( prioridad == "Medio" )   ? ( document.getElementById("media").checked = true )     : ( document.getElementById("baja").checked = true ) );
            
            //Escucha de eventos
            let guardarCambiosBoton = document.getElementById("salvarCambios");
            guardarCambiosBoton.addEventListener("click", () =>{
                verificarModificacion( arrayUsuarios, arrayTareas, indiceTarea, graficoLinea, graficoDonut )
            });
        });
    });
}

// funciones para mostrar tareas

function obtenerIndiceUsuario( arrayUsuarios, idUsuario ){
    return arrayUsuarios.findIndex( (usuario) => { return usuario.id == idUsuario })
}

function mostrarIconosColaboradores( arrayUsuarios, arrayTareas, idColaborador, indiceTarea ){
    let posicionColaborador = obtenerIndiceUsuario(arrayUsuarios, idColaborador );
    document.getElementById("colaboradores"+ arrayTareas[indiceTarea].id ).innerHTML +=`<div>
                                                                                            <img src="../assets/profiles/${ arrayUsuarios[ posicionColaborador ].fotoSrc }">
                                                                                        </div>`;
}

function mostrarColaboradores( usuarios, arrayUsuarios, arrayTareas, posicionTarea ){
    usuarios.forEach( idColaborador => {
        if( idColaborador != arrayUsuarios[ obtenerUsuarioIngresado() ].id ){
            mostrarIconosColaboradores( arrayUsuarios, arrayTareas, idColaborador , posicionTarea );
        }
    });
}

function mostrarTareas( arrayUsuarios, arrayTareas, graficoLinea, graficoDonut ){
    
    let listaTareas = document.querySelector(".tarea__lista");
    listaTareas.innerHTML = " ";

    arrayUsuarios[ obtenerUsuarioIngresado() ].tareas.forEach( idTarea =>{
        let posicionTarea = obtenerIndiceTarea(arrayTareas, idTarea );
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
        mostrarColaboradores( usuarios, arrayUsuarios, arrayTareas, posicionTarea );

    });
    eliminarTareas( arrayUsuarios, arrayTareas, graficoLinea, graficoDonut );
    modificarTareas( arrayUsuarios, arrayTareas, graficoLinea, graficoDonut );
    actualizarGraficos( arrayUsuarios, arrayTareas, graficoLinea, graficoDonut );
} 

// funciones de libreria chart.js

function actualizarGraficos( arrayUsuarios, arrayTareas, graficoLinea, graficoDonut ){

    graficoDonut.config.data.datasets[0].data = traerEstadoTareas( arrayUsuarios, arrayTareas ); 
    graficoDonut.update();
    graficoLinea.config.data.datasets[0].data = traerPrioridadTareas( arrayUsuarios, arrayTareas, "Alto" ); 
    graficoLinea.config.data.datasets[1].data = traerPrioridadTareas( arrayUsuarios, arrayTareas, "Medio" );
    graficoLinea.config.data.datasets[2].data = traerPrioridadTareas( arrayUsuarios, arrayTareas, "Bajo" );
    graficoLinea.update();
}

function traerNombresUsuarios( arrayUsuarios ){
    let listaUsuarios= [];
    arrayUsuarios.forEach( usuario => {
        listaUsuarios.push(usuario.nombre); 
    });
    return listaUsuarios
}

function traerEstadoTareas( arrayUsuarios, arrayTareas ){
    //La funcion devuelve un array con la cantidad de tareas de cada estado, 
    let estadosTareas = [0,0,0];
    arrayUsuarios[ obtenerUsuarioIngresado() ].tareas.forEach( tarea =>{
        let posicionTarea = obtenerIndiceTarea(arrayTareas, tarea );
        let { estado } = arrayTareas[ posicionTarea ];
        ( estado == "Terminado" ) ? ( estadosTareas[0]++ ) : ( ( estado == "En proceso" ) ? ( estadosTareas[1]++ ) : ( estadosTareas[2]++ ) );
    });
    return estadosTareas;
}

function traerPrioridadTareas( arrayUsuarios, arrayTareas, prioridadGrafico ){
    // Funcion que devuelve un array de todos los usuarios de la cantidad de tareas correspondiente con la prioridad pasada por parametro
    let prioridadTareas = [];
    arrayUsuarios.forEach( usuario => {
        let cantidadPrioridad = 0;
        usuario.tareas.forEach( tareaAsignada => {
            let prioridad = arrayTareas[ obtenerIndiceTarea(arrayTareas, tareaAsignada) ].prioridad;
            ( prioridadGrafico == prioridad ) && ( cantidadPrioridad++ );
        })
        prioridadTareas.push(cantidadPrioridad); 
    });
    return prioridadTareas
}

function configuracionLinea( arrayUsuarios, arrayTareas ){
    return config = {
        type: 'line',
        data: {
            labels: traerNombresUsuarios( arrayUsuarios ),
            datasets: [{
                label: 'Tareas con Prioridad Alta',
                backgroundColor: 'rgba(253, 31, 74, 0.35)',
                borderColor: 'rgb(253, 31, 74)',
                data: traerPrioridadTareas( arrayUsuarios, arrayTareas, "Alto" ),
                tension: 0.5,
                fill: true,
                pointBorderWidth: 8,
                borderJoinStyle: 'round'
            },{
                label: 'Tareas con Prioridad Media',
                backgroundColor: 'rgba(228, 51, 151, 0.35)',
                borderColor: 'rgb(251, 189, 13)',
                data: traerPrioridadTareas( arrayUsuarios, arrayTareas, "Medio" ),
                tension: 0.5,
                fill: true,
                pointBorderWidth: 8,
                borderJoinStyle: 'round'
            },{
                label: 'Tareas con Prioridad Baja',
                backgroundColor: 'rgba(0, 196, 204, 0.35)',
                borderColor: 'rgb(0, 196, 204)',
                data: traerPrioridadTareas( arrayUsuarios, arrayTareas, "Bajo" ),
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

function configuracionDoughnut( arrayUsuarios, arrayTareas ){
    return config = {
        type: 'doughnut',
        data: {
            // labels tiene un orden que coincide con el retorno de la funcion traerEstadoTareas()
            labels: labels = ['Terminado','En Proceso','Empezar'],
            datasets : [{
                label: 'Estado Tareas',
                data: traerEstadoTareas( arrayUsuarios, arrayTareas ),
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

function crearGrafico( idNodo, configuracion ){
    return new Chart( document.getElementById(idNodo), configuracion)
}

// Inicio de aplicacion

function mostrarDatos( arrayUsuarios, arrayTareas, graficoLinea, graficoDonut ){
    cerrarSesion();
    graficoLinea = crearGrafico( 'graficoLinea', configuracionLinea( arrayUsuarios, arrayTareas ) );
    graficoDonut = crearGrafico( 'graficoDoughnut', configuracionDoughnut( arrayUsuarios, arrayTareas ) );
    crearTareas( arrayUsuarios, arrayTareas, graficoLinea, graficoDonut );
    mostrarTareas( arrayUsuarios, arrayTareas, graficoLinea, graficoDonut );
    mostrarUsuarioRegistrado( arrayUsuarios );
}

function guardarIndiceUsuario( arrayUsuarios ){
    // Guarda en el Local Storage el indice del usuario ingresado
    const indexUsuarioRegistrado = arrayUsuarios.findIndex( usuario => { return usuario.nombre == localStorage.getItem("usuario") });
    localStorage.setItem("indiceUsuario", indexUsuarioRegistrado)
}

async function insertarDatosUsuarios( datosUsuarios, arrayUsuarios ){
    datosUsuarios.forEach( usuario => {
        arrayUsuarios.push(new Usuario( usuario.id , usuario.nombre , usuario.contraseña , usuario.rol , usuario.fotoSrc , [...usuario.tareas] ));
    });
    return arrayUsuarios
}

async function insertarDatosTareas( datosTareas, arrayTareas ){
    datosTareas.forEach( tarea => {
        arrayTareas.push(new Tarea( tarea.id , tarea.nombre , tarea.estado , tarea.inicio , tarea.fin, tarea.prioridad, tarea.descripcion , [...tarea.usuarios] ));
    });
    return arrayTareas
}

async function obtenerDatos( url ){
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    return datos
}

async function iniciarAplicacion(){
    //Los datos extraidos de la API de JSONStorage se almacenan en arrays locales
    let arrayUsuarios = [], arrayTareas = [], graficoLinea, graficoDonut;
    const urlApiUsuarios = 'https://api.jsonstorage.net/v1/json/3569e258-b49a-40c1-9779-2856dadd6bff/9c8901ce-6ddb-434c-826c-790b12f6fd4d';
    const urlApiTareas = 'https://api.jsonstorage.net/v1/json/3569e258-b49a-40c1-9779-2856dadd6bff/302c1d8e-b5d8-41c9-8e95-8106e0d44709';

    const datosUsuarios = await obtenerDatos( urlApiUsuarios );
    const datosTareas = await obtenerDatos( urlApiTareas );
    arrayUsuarios = await insertarDatosUsuarios( datosUsuarios, arrayUsuarios );
    arrayTareas = await insertarDatosTareas( datosTareas, arrayTareas );

    guardarIndiceUsuario( arrayUsuarios );

    mostrarDatos( arrayUsuarios, arrayTareas, graficoLinea, graficoDonut );
}

window.onload = () => {
    if( localStorage.getItem("recordar") == "true" )
        iniciarAplicacion()
    else if( localStorage.getItem("recordar") == "false" )
        iniciarAplicacion()
    else
        window.location.assign("../index.html")
}