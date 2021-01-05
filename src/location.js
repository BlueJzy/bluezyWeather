const request = require('request');

const geoCode =  (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/nuwara.json?access_token=pk.eyJ1IjoiYW51cnVkZGhhYmFuZGFyYSIsImEiOiJja2VzbGZ1NXIzYzNkMzBwY3hycnhvb2RzIn0.4Ecsypf73bqQg88Z2w2Psg&limit=1";

    request( {url:url, json:true}, (error, response) => {
        if (error) {
            callback('Unable to find the Network', undefined);
        }else if ( response.body.features.length === 0 ) {
            callback('Unable to find the Location', undefined);
        }else {
            let location_name = response.body.features[0].place_name;
            let log = response.body.features[0].center[0];
            let lat = response.body.features[0].center[1];
            callback(undefined, {
                logtitude: log,
                latitude: lat,
                location: location_name
            });
        }
    });
}

module.exports = geoCode;