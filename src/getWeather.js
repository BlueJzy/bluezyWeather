const request = require('request');


const getWeather = (log, lat, callback) => {
    const url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+log+"&appid=3e94ac77ff2faba2b9e503de05184859";

    request( {url:url, json:true}, (error, response) => {
        if ( error ){
            callback('Unbale to connect to the Network! :(', undefined);
        } else if ( response.body.error) {
            callback( 'Invalid Location for the Weather Service', undefined)
        }else {
            let description = response.body.weather[0].description;
            let winSpeed = response.body.wind.speed;
            callback(undefined, {
                description:description,
                winSpeed:winSpeed
            });
        }
    });
}


module.exports = getWeather;