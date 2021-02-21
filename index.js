const Discord = require("discord.js");
const config = require("./config.json");
const minTiradaDado = 1
const client = new Discord.Client();


// Cuando este el cliente operativo realizar las siguientes acciones
client.on("ready", ()=>{

    // Variable que guarda el ID del canal
    var generalChannel = client.channels.cache.get("ID del canal")

    // Envia un mensaje al canal
    generalChannel.send("Hola a todo el mundo!")
})

client.on('message', message =>{
    

    if(message.content == 'Buenas'){
        message.channel.send("Hola " + `${message.author}` + ", que tengas un bonito dia!");
    }

    if(message.content.substr(0,5) == '!roll'){
        tirada_dado(message)
    }

} )

function tirada_dado(message){
    mensaje = message.content

    if(message.content.includes(" ")){
        mensaje = mensaje.split(" ")

        serieCantidadCara = obtenerSerieCantidadCara(mensaje[1],message)

        if (serieCantidadCara == -1){
            //message.channel.send( "Seriecantidadcara dio NaN");
            return 0 
        }
        
        serie = serieCantidadCara[0]
        cantidad = serieCantidadCara[1]
        cara = serieCantidadCara[2]

        //message.channel.send( 'serie: ' + serie +  ' cantidad: ' + cantidad + ' cara: ' + cara);

        var resultado =  tirarDados(serie,cantidad,cara,message)
        suma = 0
        parseInt(suma,10)
        if (serie == 1){
            for(var j=0; j<cantidad; j++){
                suma += parseInt(resultado[0][j],10)
                suma = parseInt(suma,10)
            }
            message.channel.send( `${message.author}` + ' rolled ' + '**(' + resultado +') => '+suma+'**.');
        }else{
            message.channel.send( `${message.author}` + ' rolled :');
            for(var i=0; i<serie; i++){
                suma = 0
                parseInt(suma,10)
                for(var j=0; j<cantidad; j++){
                    suma += parseInt(resultado[i][j],10)
                    suma = parseInt(suma,10)
                }
                message.channel.send( '**(' + resultado[i] +') => '+suma+'**.');
            }
        }
        
    }else{ // Por defecto tiro 1d20
        var resultado =  tirarDados(1,1,20,message)
       // message.channel.send( `${message.author}` + ' rolled ' + '**' +  +'**.');
        message.channel.send( `${message.author}` + ' rolled ' + '**(' + resultado[0] +')**.');
    }
    

    
    



    
}

function obtenerSerieCantidadCara(mensaje,message){
    serieCantidadCara = obtenerSerie_cantidadCara(mensaje,message)
    if (serieCantidadCara == -1){
        return -1
    }
    serie = serieCantidadCara[0]
    
    
    cantidadCara = obtenerCantidad_cara(serieCantidadCara[1],message)
    
    if (cantidadCara == -1){
        return -1
    }
    cantidad = cantidadCara[0]
    cara = cantidadCara[1]

    
    

    return [serie,cantidad,cara]
    
    


}

function obtenerSerie_cantidadCara(mensaje,message){

    if(mensaje.includes("x")){
        // Hay x en el mensaje
        mensaje = mensaje.split('x') 
        
        serie   = parseInt(mensaje[0],10)

        if (Number.isNaN(serie)){
            //message.channel.send( "Serie dio NaN");
            return -1
        }

        mensaje = mensaje[1]
        //message.channel.send( "mensaje: "+ mensaje);

    }else{

        serie = 1
        
    }
    return [serie,mensaje]
}

function obtenerCantidad_cara(mensaje,message){
    if (mensaje.includes('d')){
        cantidadCara = mensaje.split('d')
        if(mensaje[0] == 'd'){
            cantidad = 1
        }else{
            cantidad = parseInt(cantidadCara[0])
        }

        cara = parseInt(cantidadCara[1])

        if(Number.isNaN(cara) || Number.isNaN(cantidad)){
           // message.channel.send( "Cara o Cantidad dio NaN");
            return -1
        }

        return [cantidad,cara]
    }else{
        return -1
    }
}
function tirarDados(cantidadVeces,cantidadDados,carasDado,message){
    var veces = 0

    tiradasTotal = []
    
    for(veces; veces < cantidadVeces; veces++){
       tiradasTotal.push(tirada(cantidadDados,carasDado,message))
       //message.channel.send( "serieTiradas: "+tiradasTotal[0]);
    }


    return tiradasTotal

}

function tirada(cantidadDados,carasDado,message){
    var cantidad = 0
    tiradas = []

    for (cantidad; cantidad < cantidadDados; cantidad++){
        tiradas.push(ejecutarTirada(carasDado,message))
    }
   // message.channel.send( "TiradasCantDados: "+ tiradas);
    return tiradas
}

function ejecutarTirada(carasDado,message){
    var resultado =  Math.random() * (carasDado - minTiradaDado) + minTiradaDado;
    resultado = resultado.toFixed()
   // message.channel.send( "Tirada: "+ resultado);
    return resultado
}

client.login(config.BOT_TOKEN)


// se ejecuta con node "nombre archivo".js