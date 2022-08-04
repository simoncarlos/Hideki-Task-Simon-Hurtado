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
    mostrar() {
        alert("\n\nEl id de tarea es: " + this.id + "\n\nEl nombre de la tarea es: " + this.nombre + "\n\nTu tarea es: " + this.descripcion + "\n\nSu prioridad es: " + this.prioridad);
    }
    modificar(nombre, descripcion, prioridad) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.prioridad = prioridad;
    }
}

class Usuario{
    constructor(id, nombre, contraseña, rol, fotoSrc, tareas){
        this.id = id;
        this.nombre = nombre;
        this.contraseña = contraseña;
        this.rol = rol;
        this.fotoSrc= fotoSrc;
        this.tareas = tareas;//array
    }
}

function mostrarTareas(){
    console.log(arrayTareas);
    let listaTareas = document.querySelector(".tarea__lista");
    listaTareas.innerHTML = " ";
    arrayTareas.forEach( element => {
        
        let colorPrioridad = "bajo";
        let colorEstado = "proceso";
    
        if( element.prioridad == "Alto" ){
            colorPrioridad = "alto";
        }
        else if( element.prioridad == "Medio" ){
            colorPrioridad = "medio";
        }
    
        if( element.estado == "Terminado" ){
            colorEstado = "terminado";
        }
        else if( element.estado == "Comenzar" ){
            colorEstado = "hacer";
        }
    
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
                                                ${element.inicio}  -  ${element.fin}
                                            </div>
                                        </div>
                                        <div class="tarea__prioridad">
                                            <div class="tarea__prioridad--valor tarea__prioridad--${colorPrioridad}">${element.prioridad}</div>
                                        </div>
                                        <div class="tarea__opciones"> <i id="${element.id}" class='bx bx-edit'></i><i id="borrar${element.id}" class='bx bx-trash-alt'></i> </div>
                                    </div>`;

        let idTareaColaboradores = "tarea"+element.id;
        let listaColaboradores = document.getElementById(idTareaColaboradores);

        element.colaboradores.forEach( idColaborador => {
            listaColaboradores.innerHTML += `   <div>
                                                    <img src="assets/profiles/${idColaborador}.png">
                                                </div>`;
        });
    });

    modificarTareas();
    eliminarTareas();
}

function modificarTareas(){

    let lista = document.querySelectorAll('.bx-edit');
    let modificar = document.querySelector(".tarea__popup");

    lista.forEach(element => {
        element.addEventListener('click', (e) =>{ 

            let indicePosicion = arrayTareas.findIndex( position => { 
                return position.id == e.target.id 
            });
            modificar.innerHTML = " ";//${arrayTareas[ (arrayTareas.length - e.target.id) ].nombre}
            modificar.innerHTML += `<div class="tarea__modificar">  
                                        <i class='bx bx-x-circle'></i>
                                        <label id="placeholder">Nombre de la tarea</label>
                                        <input type="text" id="nombre" class="tarea__modificar--nombre" value="${arrayTareas[indicePosicion].nombre}">

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
                                        <textarea class="tarea__modificar--descripcion"> ${arrayTareas[ indicePosicion ].descripcion} </textarea>

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
                                            <p id="placeholder5">Participantes</p>
                                            <ul class="tarea__modificar--profiles">
                                            </ul>
                                        </div>
                                    </div>`;
            modificar.style.display = "block";
            let botonCerrar = document.querySelector(".bx-x-circle");
            botonCerrar.addEventListener("click", () => {
                modificar.style.display = "none";
            });

            let listaColaboradores = document.querySelector(".tarea__modificar--profiles");

            arrayTareas[ indicePosicion ].colaboradores.forEach( element => {
                let posicion = arrayUsuarios.findIndex( usuario => usuario.id == element );
                listaColaboradores.innerHTML += `
                                                <li id="${element}">
                                                    <img src="assets/profiles/${element}.png">
                                                    <article>
                                                        <p class="tarea__perfil--nombre">${arrayUsuarios[posicion].nombre}</p>
                                                        <p class="tarea__perfil--rol">${arrayUsuarios[posicion].rol}</p>
                                                    </article>
                                                </li>`; 
            });
            
            if( arrayTareas[ indicePosicion ].estado == "Terminado" ){
                let estado1 = document.getElementById("terminado");
                let estado2 = document.getElementById("enProceso");
                let estado3 = document.getElementById("comenzar");
                estado1.checked = true;
                estado2.checked = false;
                estado3.checked = false;
            }
            else if( arrayTareas[ indicePosicion ].estado == "En proceso" ){
                let estado1 = document.getElementById("terminado");
                let estado2 = document.getElementById("enProceso");
                let estado3 = document.getElementById("comenzar");
                estado1.checked = false;
                estado2.checked = true;
                estado3.checked = false;
            }else{
                let estado1 = document.getElementById("terminado");
                let estado2 = document.getElementById("enProceso");
                let estado3 = document.getElementById("comenzar");
                estado1.checked = false;
                estado2.checked = false;
                estado3.checked = true;
            }

            if( arrayTareas[ indicePosicion ].prioridad == "Alto" ){
                let prioridad1 = document.getElementById("alta");
                let prioridad2 = document.getElementById("media");
                let prioridad3 = document.getElementById("baja");
                prioridad1.checked = true;
                prioridad2.checked = false;
                prioridad3.checked = false;
            }
            else if( arrayTareas[ indicePosicion ].prioridad == "Medio" ){
                let prioridad1 = document.getElementById("alta");;
                let prioridad2 = document.getElementById("media");;
                let prioridad3 = document.getElementById("baja");
                prioridad1.checked = false;
                prioridad2.checked = true;
                prioridad3.checked = false;
            }else{
                let prioridad1 = document.getElementById("alta");
                let prioridad2 = document.getElementById("media");
                let prioridad3 = document.getElementById("baja");
                prioridad1.checked = false;
                prioridad2.checked = false;
                prioridad3.checked = true;
            }

            //Escucha de eventos

            let name = document.querySelector(".tarea__modificar--nombre"); //Escucha del nombre

            name.addEventListener("change", () => {
                arrayTareas[ indicePosicion ].nombre = name.value;
                mostrarTareas();
            });

            let description = document.querySelector(".tarea__modificar--descripcion");
            description.addEventListener("change", () => {
                arrayTareas[ indicePosicion ].descripcion = description.value;
                mostrarTareas();
            });

            var states = document.querySelectorAll('input[type=radio][name="estado"]');
            states.forEach( option => { 
                option.addEventListener('change', () => {
                    if( option.id == "terminado" ){
                        arrayTareas[ indicePosicion ].estado = "Terminado";
                    }
                    else if( option.id == "enProceso" ){
                        arrayTareas[ indicePosicion ].estado = "En Proceso";
                    }
                    else{
                        arrayTareas[ indicePosicion ].estado = "Comenzar";
                    }
                    mostrarTareas();
                }); 
            });

            var priority = document.querySelectorAll('input[type=radio][name="prioridad"]');
            priority.forEach( option => { 
                option.addEventListener('change', () => {
                    if( option.id == "alta" ){
                        arrayTareas[indicePosicion].prioridad = "Alto";
                    }
                    else if( option.id == "media" ){
                        arrayTareas[indicePosicion].prioridad = "Medio";
                    }
                    else{
                        arrayTareas[indicePosicion].prioridad = "Bajo";
                    }
                    mostrarTareas(); 
                }); 
            });
        });
    });
}

function eliminarTareas(){

    let botonEliminar = document.querySelectorAll(".bx-trash-alt");
    botonEliminar.forEach( element => {
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

//Entrega de DOM
arrayTareas.unshift(new Tarea( 1 , "Responsive Design", "Terminado" ,   [ 1 , 2 , 3 , 4 , 5 ] , "6 ene" ,    "19 ene" ,  "Medio" , "Hacer diseño responsivo desitio web xdxdxd" ));
arrayTareas.unshift(new Tarea( 2 , "Web Development",   "En proceso" ,  [ 2 , 3 , 4 ] , "17 ene" ,   "13 feb" ,  "Alto" , "Hacer diseño responsivo desitio web xdxdxd" ));
arrayTareas.unshift(new Tarea( 3 , "Databases",         "Comenzar" ,    [ 3 , 4 , 5 ] , "23 feb" ,   "1 mar" ,   "Bajo" , "Hacer diseño responsivo desitio web xdxdxd" ));
arrayTareas.unshift(new Tarea( 4 , "Final Proyect",     "En proceso" ,  [ 4 , 5 , 6 ] , "9 may" ,    "19 may" ,  "Medio" , "Hacer diseño responsivo desitio web xdxdxd" ));
arrayTareas.unshift(new Tarea( 5 , "Wireframes",        "Terminado" ,   [ 5 , 6 , 1 ] , "30 may" ,   "5 jun" ,   "Medio" , "Hacer diseño responsivo desitio web xdxdxd" ));
arrayTareas.unshift(new Tarea( 6 , "Entrevistas",       "En proceso" ,  [ 6 , 1 , 2 ] , "27 jun" ,   "5 jul" ,   "Alto" , "Hacer diseño responsivo desitio web xdxdxd" ));
arrayTareas.unshift(new Tarea( 7 , "Benchmarking",      "Comenzar" ,    [ 1 , 2 , 3 ] , "1 jul" ,    "3 agos" ,  "Bajo" , "Hacer diseño responsivo desitio web xdxdxd" ));
arrayTareas.unshift(new Tarea( 8 , "POV + MVP",         "En proceso" ,  [ 2 , 3 , 4 ] , "23 agos" ,  "23 sep" ,  "Bajo" , "Hacer diseño responsivo desitio web xdxdxd" ));

arrayUsuarios.unshift(new Usuario( 1 , "Solange",   "contraseña" , "Tutora" ,     "1.png" ,  ["1", "2", "3"]  ));
arrayUsuarios.unshift(new Usuario( 2 , "Florencia", "contraseña" , "Profesora",   "18.png" , ["2", "3", "4"]  ));
arrayUsuarios.unshift(new Usuario( 3 , "Marco",     "contraseña" , "Tutor" ,      "12.png" , ["3", "4", "5"]  ));
arrayUsuarios.unshift(new Usuario( 4 , "Diana",     "contraseña" , "Tutora" ,     "19.png" , ["4", "5", "6"]  ));
arrayUsuarios.unshift(new Usuario( 5 , "Mariano",   "contraseña" , "Coordinador", "13.png" , ["5", "6", "7"]  ));
arrayUsuarios.unshift(new Usuario( 6 , "Diego",     "contraseña" , "Alumno" ,     "7.png" ,  ["6", "7", "8"]  ));

console.log(arrayUsuarios);


mostrarTareas();



