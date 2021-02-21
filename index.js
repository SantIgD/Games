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
            message.channel.send( "Seriecantidadcara dio NaN");
            return 0 
        }
        
        serie = serieCantidadCara[0]
        cantidad = serieCantidadCara[1]
        cara = serieCantidadCara[2]

        message.channel.send( 'serie: ' + serie +  ' cantidad: ' + cantidad + ' cara: ' + cara);

        var resultado =  tirarDados(serie,cantidad,cara)
        message.channel.send( `${message.author}` + ' rolled ' + '**(' + resultado +')**.');
    }else{ // Por defecto tiro 1d20
        var resultado =  tirarDados(1,20,1)
       // message.channel.send( `${message.author}` + ' rolled ' + '**' +  +'**.');
        message.channel.send( `${message.author}` + ' rolled ' + '**(' + resultado[0] +')**.');
    }
    

    
    



    
}

function obtenerSerieCantidadCara(mensaje,message){
    serieCantidadCara = obtenerSerie_cantidadCara(mensaje,message)
    serie = serieCantidadCara[0]
    cantidadCara = obtenerCantidad_cara(serieCantidadCara[1],message)
    cantidad = cantidadCara[0]
    cara = cantidadCara[1]

    if (serie == -1 || cantidadCara == -1){
        return -1
    }

    return [serie,cantidad,cara]
    
    


}

function obtenerSerie_cantidadCara(mensaje,message){

    if(mensaje.includes("x")){
        // Hay x en el mensaje
        mensaje = mensaje.split('x') 
        
        serie   = parseInt(mensaje[0])

        if (isNaN(serie)){
            message.channel.send( "Serie dio NaN");
            return -1
        }

        mensaje = mensaje[1]

    }else{

        serie = 1
        
    }
    return [serie,mensaje]
}

function obtenerCantidad_cara(mensaje,message){
    if (mensaje.includes('d')){
        cantidadCara = mensaje.split('d')
        if(cantidadCara[0] == 'd'){
            cantidad = 1
        }else{
            cantidad = parseInt(cantidadCara[0])
        }

        cara = parseInt(cantidadCara[1])

        if(isNaN(cara) || isNaN(cantidad)){
            message.channel.send( "Cara o Cantidad dio NaN");
            return -1
        }

        return [cantidad,cara]
    }else{
        return -1
    }
}
function tirarDados(cantidadDados,carasDado,cantidadVeces){
    var veces = 0
    tiradas = {}
    
    for(veces; veces < cantidadVeces; veces++){
       tiradas[veces] = tirada(cantidadDados,carasDado)
    }

    return tiradas

}

function tirada(cantidadDados,carasDado){
    var cantidad = 0
    tiradas = {}

    for (cantidad; cantidad < cantidadDados; cantidad++){
        tiradas[cantidad] = ejecutarTirada(carasDado)
    }

    return tiradas
}

function ejecutarTirada(carasDado){
    var resultado =  Math.random() * (carasDado - minTiradaDado) + minTiradaDado;
    return resultado.toFixed()
}

client.login(config.BOT_TOKEN)