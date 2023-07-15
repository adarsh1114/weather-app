const {response}  = require('express');
const express = require("express");
const { STATUS_CODES } = require('http');
const app = express();
const https = require('https');
const bodyParser = require('body-parser')
require('dotenv').config()
const API_key=process.env.API_KEY;
//console.log(process.env.API_KEY);
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/assets',express.static('assets'));

app.get("/",(req,res) =>{
    res.sendFile(__dirname + "/index.html" );
})
app.post('/',(req,res) =>{
  const querry = req.body.cityname;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${querry}&appid=${API_key}&units=metric`
    //console.log(url);
    https.get(url,(response) => {
      //console.log(response,STATUS_CODES);
      response.on('data',(data) => {
            //console.log(data);
        const weatherData = JSON.parse(data);
        //console.log(weatherData.main);
      const temp = weatherData.main.temp;
      const discription = weatherData.weather[0].description;
      res.write("<body style='background:lightskyblue'></body>");
      res.write("<h1>The temperature in " + querry +  " is " + temp +  " degree celcius</h1>");
      res.write("<h3>The weather discription is " + discription + "</h3>")
    //console.log(weatherData);
      })
    })
})

app.listen(3000,() => {
    console.log("this server is runnig");
})