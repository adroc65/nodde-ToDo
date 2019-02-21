const fs = require('fs');

let listadoPorHacer = []; // Arreglo para manipular datos.

// -------------------------------------------------------------------
// Para escribir en el archivo data.json, se debe de escribir 
// todo el arreglo de "listadoPorHacer", ya que si no se escribe
// solamente una línea. Se usa el siguiente procedimiento:
const guardarDB = () =>{
    let data = JSON.stringify(listadoPorHacer); 
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo Grabar', err);    
    });   
}
// --------------------------------------------------------------------
// Para leer todo el Archivo que simula la BD, ojo toda la manipulación
// de datos se hace en el arreglo "listadoPorHacer", seria:
const cargarDB = () =>{
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}
// ------------------------------------------------------------------
// Para incluir una nueva tarea, se usa "crear", se recibe la
// descripción por línea de comando y se crea el objeto "porHacerLocal"
// para agregarle el "completado: false" luego se guarda con el "push", 
// en listado por hacer y por último se guarda en el archivo JSON.
const crear = ( descripcion ) => {
    
    cargarDB();     // Se lee la Base de datos. 
                    // Y se guarda en "listadoPorHacer"
     
    let porHacerLocal = {
        id: Math.floor(Date.now() / 1000), // Timestamp en segundos
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacerLocal); // Se guarda el nuevo dato
    guardarDB();
    return porHacerLocal;
}
// ------------------------------------------------------------------
// Para listar la base de datos, basta con cargar el archivo JSON al 
// arreglo  y devolverlo a la función que lo pide. 
const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}
// -------------------------------------------------------------------
// Para actualizar una tarea (completar) se debe de recibir la descripción 
// de esta buscarla en la BD y proceder a cambiarle la opción "completado".
const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion); //"descripcion" es lo que se busca.

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}
// -------------------------------------------------------------------
// Para borrar las tareas, sed va a usar la funcion "filter", para buscar
// la tarea a borrar.
const borrar = (descripcion) => {

    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion); // Quita la entrada que es igual, y copia el resto.

    if (listadoPorHacer.length === nuevoListado.length) {
        return false; // No se borro nada.
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true; // Se borro!
    }
}
// --------------------------------------------------------------------

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}