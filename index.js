const Twit = require('twit')

const T = new Twit({
    consumer_key:         'qM4ebRiS0hjpyKPaUELCYtLu2',
    consumer_secret:      'i9KO5DsJTMLIoO9os344W9Q3Mb54ekAVxoNlQGBegNgmkqRz8X',
    access_token:         '1451752376453537792-I3awEsG28GpR40R5lo9Oi3QehnQSbq',
    access_token_secret:  'YRPbvWAgSWmhd8sfUNhCdYVTnyNVbDRQVvHxc0HctjnyW',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
  })
 


 const stream = T.stream('statuses/filter', { track:'halloween'||"el 30"||"#vuelvesauce"})
  
 stream.on('tweet', function (tweet) {
   let keywords = ["salir", "fiesta", "finde","plan",'inviten','donde','joda','hace','hacer','algo','planes','jodita','pasen','avisen','#vuelvesauce'];
   let ejemplo = tweet.text
   let resultado = "";
   let pos = -1
   if(ejemplo.includes('#vuelvesauce')){
    T.post('statuses/retweet/:id', { id: tweet.id_str }, function (err, data, response) {
        console.log("retweet")
      })
    
      T.post('favorites/create', { id: tweet.id_str }, function (err, data, response) {
        console.log("fav")
      })
   }
    console.log(tweet.user.location)
//uso foreach para recorrer cada elemento del array
keywords.forEach(function(element) {
    let ubicacion=tweet.user.location
    if (ubicacion===null){
        ubicacion='Desconocido'
    }

    //En caso de existir se asigna la posición en pos
    pos = ejemplo.search(element.toString());

    //Si existe
    if(pos!=-1  && ubicacion.includes('Uruguay')){
    console.log('respondi a'+tweet.user.screen_name)
    let reply="@"+tweet.user.screen_name+" Hola te habla el bot del pueblo para decirte que este finde es en Sauce porque #vuelvesauce"
    if(tweet.user.id_str!='1451752376453537792'){
    T.post('statuses/update', { status: reply, in_reply_to_status_id:tweet.id_str}, function(err, data, reply) {
        console.log("respondi")
    })
    }

}});

//En caso de que no exista.
if(pos === -1 && resultado === ""){resultado = "No existe ninguna de las palabras del array.";}
 })
  
  
  
  
  
  /*
  const stream = T.stream('statuses/filter', { track: '#vuelvesauce' })

  stream.on('tweet', function (tweet) {

   
   T.post('statuses/retweet/:id', { id: tweet.id_str }, function (err, data, response) {
    console.log("retweet")
  })

  T.post('favorites/create', { id: tweet.id_str }, function (err, data, response) {
    console.log("fav")
  })
}
  

})*/