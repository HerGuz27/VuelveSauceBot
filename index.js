const Twit = require('twit')

const T = new Twit({
    consumer_key:         'FWQ7jyvIOgjUZawa57Qd2dRps',
    consumer_secret:      'DLhyFFzX2rAWk38eoRZQnUlHMGQ9lBcnDmhzGEBTnrnAR6rqyk',
    access_token:         '1451752376453537792-qaBH34Ju8AZ4WLS52OiO9EbGQlnp4D',
    access_token_secret:  'UkNkt7TR1Ckkn9nV61zIo9wS2ypGntXxmLkl35kxaqQtU',
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
keywords.forEach(function(element) {
    let ubicacion=tweet.user.location
    if (ubicacion===null){
        ubicacion='Desconocido'
    }

    
    pos = ejemplo.search(element.toString());

    
    if(pos!=-1  && ubicacion.includes('Uruguay')){
    console.log('respondi a'+tweet.user.screen_name)
    let reply="@"+tweet.user.screen_name+" Hola te habla el bot del pueblo para decirte que este finde es en Sauce porque #vuelvesauce"
    if(tweet.user.id_str!='1451752376453537792'){
    T.post('statuses/update', { status: reply, in_reply_to_status_id:tweet.id_str}, function(err, data, reply) {
        console.log("respondi")
    })
    }

  }})
})