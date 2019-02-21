

const descripcion = {
            demand: true,
            alias: 'd',
            desc: 'Descripción de la tarea por Hacer'
    };

const completado = {
            alias: 'c',
            default: 'true',
            desc: 'Marca como completado o pendiente una tarea'
    };


const argv = require('yargs')
//  .command('listar', 'Imprime las tares por hacer') //No es necesario
    .command('crear', 'Crea una tarea por hacer', {
        descripcion
    })
    .command('actualizar', 'Cambia el estado de una tarea', {
        descripcion,
        completado
    }) 
    .command('borrar', 'Borra una tarea',{
        descripcion
    })   
    .help()
    .argv;

module.exports ={
    argv //Se exporta una variable.
}