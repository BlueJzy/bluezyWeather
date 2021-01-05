const express = require('express');
const path = require('path');
const hbs = require('hbs');
const request = require('request');

// adding custom modules
const geoCode = require('./location');
const getWeather = require('./getWeather');

// create app
const app = express();

// Define path for express config
const publiDir = path.join(__dirname, '../public'); // -> getting public dir
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// setup handlebar engine and view location 
app.set('view engine', 'hbs'); // telling use hbs
app.set('views', viewsPath);
hbs.registerPartials(partialPath); 


// setup static dir to server
app.use(express.static(publiDir));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        name: 'anuruddha bandara'
    }); // -> this will look in views folder
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'nimeshika dilshani'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Hello this is help page!',
        name: 'anuruddha bandara'
    });
})

app.get('/about', (req, res) => {
    res.send('<h1> About Page <h1>');
});

app.get('/weather', (req, res) => {
    res.render('weather', {
        title: 'Today Weather',
        name: 'anuruddha bandara',
        descprip: 'Welcome to the Weather Page!'
    });
});

// Weather End point
app.get('/myweather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "Invalid address! :( "
        });
    }
    // calling the geocode funtion
    geoCode(req.query.address, (error, data) => {
        if (error != undefined) {
            res.send({
                Error: error
            });
        }else {
            const log = data.logtitude;
            const lat = data.latitude;
            getWeather (log, lat, (err_, data_) => {
                if ( err_ != undefined ){
                    res.send({
                        Error: err_
                    });
                }else{
                    const windSpd = data_.winSpeed;
                    const descrp = data_.description;                
                    res.send({
                        windSpeed: windSpd,
                        Description: descrp,
                        Location: req.query.address
                    });
                }
            });
        }
    });
});

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send( {
            error: "you must provide a serach key"
        }) // -> retun will stop the code running.
    }
    res.send({
        product: ["hello", "world"]
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 :( ',
        message: "Help Artical is Not Found",
        name: 'anuruddha bandara'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 :( ',
        message: "Page you looked for Cann't be Found",
        name: 'anuruddha bandara'
    });
});

// start the server up
app.listen(3000, () => {
    console.log('Server is Up on Port: 3000');
});

