
const colors = require('colors');
const argv = require( './config/yargs' ).argv; // Se requiere una variable no un método.
const porHacer = require('./porHacer/por-hacer');

let comando = argv._[0];

console.log(Math.floor(Date.now() / 1000)); // En segundos solo el entero

switch ( comando ) {
    case 'crear':
        let tarea = porHacer.crear( argv.descripcion );
        console.log( tarea );
        break;

    case 'listar':
        let listado = porHacer.getListado(); //Se llama a leer la BD.
        //console.log(listado);
        
        for (let tarea of listado) {
            console.log('======== Por Hacer ========='.green);
            console.log('Id: ', tarea.id );
            console.log(tarea.descripcion);
            console.log('Completado: ', tarea.completado );
            console.log('----------------------------'.green);
        }    
        break;

    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;

    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;

    default:
        console.log('Comando no reconocido');
        
        break;
}