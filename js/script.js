const arrayTareas = [];

class Tarea{
    constructor(id, nombre, descripcion, prioridad){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.prioridad = prioridad;
    }
    mostrar() {
        alert("\n\nEl id de tarea es: " + this.id + "\n\nEl nombre de la tarea es: " + this.nombre + "\n\nTu tarea es: " + this.descripcion + "\n\nSu prioridad es: " + this.prioridad);
    }
}

function modificarTarea(){

    let nombreBusqueda = prompt("Ingrese el nombre de la tarea que desea modificar")
    let posicion = arrayTareas.findIndex( element => element.nombre == nombreBusqueda );

    if( posicion != -1 ){

        arrayTareas[posicion].nombre = prompt("Ahora ingrese nuevo nombre de la tarea");
        arrayTareas[posicion].descripcion = prompt("Ahora ingrese la nueva descripcion");
        alert("A continuacion le mostramos la lista de tareas por pantalla");
        arrayTareas.forEach( element => { element.mostrar() } );

    }
    else{
        alert("Su nombre de tarea ingresado no existe :(");
    }

}

function agregarTarea(id){

    arrayTareas.unshift(new Tarea( // Agregar tarea
        id , // ID de la tarea
        prompt("Por favor ingrese el nombre de la tarea que debe realizar"), // Nombre de la tarea
        prompt("Por favor ingrese la descripción de la tarea que debe realizar"),  // Descripcion de la tarea
        prompt("Por favor ingrese la prioridad que va a tener su proyecto") // Prioridad de la tarea
    ));

}

function borrarTarea(){

    let idBusqueda = prompt("Ingrese el id de la tarea que desea borrar:")
    let indice = arrayTareas.findIndex( element => element.id == idBusqueda );

    if( indice != -1 ){

        alert("¡Su tarea " + arrayTareas[indice].nombre + " fue borrado con exito!"); 
        arrayTareas.splice((indice), 1);

        if( arrayTareas.length != 0 ){
            alert("A continuacion le mostramos la lista de tareas por pantalla");
            arrayTareas.forEach( element => { element.mostrar() } );
        }
        else{
            alert("No existen tareas para mostrar, debe ingresar una nueva tarea");
        }

    }
    else{
        alert("Su id de tarea ingresado no existe :(");
    }

}

function condicionalCantidad( funcion1, funcion2 ){

    if( arrayTareas.length > 0 ){
        funcion1();
    }
    else{
        funcion2();
    }

}

let nombre = prompt("¡Hola! Por favor ingrese su nombre a continuacion..");
let salir = false;

do{

    switch( prompt("Hola " + nombre + ",¿Que desea hacer? \n1 - Ver Lista de tareas \n2 - Agregar una tarea \n3 - Modificar una tarea  \n4 - Eliminar una tarea \n5 - Salir") ){
        case "1" :
            condicionalCantidad( () => { arrayTareas.forEach( element => { element.mostrar() } ) } , () => { alert("No existen tareas para mostrar, debe ingresar una nueva tarea")} );
            break;
    
        case "2" :
            condicionalCantidad( () => { agregarTarea( arrayTareas[0].id + 1 ) } , () => { agregarTarea( 1 ) } );
            break;
        
        case "3" :
            condicionalCantidad( modificarTarea, () => { alert("No existen tareas para modificar, debe ingresar una nueva tarea") } );
            break;

        case "4" :
            condicionalCantidad( borrarTarea, () => { alert("No existen tareas para borrar, debe ingresar una nueva tarea") } );
            break;
    
        case "5" :
            salir = true;
            break;
    
        default:
            alert(nombre + ", la opcion ingresada no es valida, por favor reintente");
            break;    
    }

}while(!salir);
