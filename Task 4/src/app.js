const express=require('express')
const request=require('request')
const app=express()
const port=process.env.PORT || 3000
const country="egypt"
const weatherURL="https://api.weatherapi.com/v1/current.json?key=d57382789e9c42468b4161902231707&q="+country+"&aqi=no"
const geoCodeURL="https://api.mapbox.com/geocoding/v5/mapbox.places/"+country+".json?access_token=pk.eyJ1IjoibWliYm9vbyIsImEiOiJjbGtrMWJoOWgwbWppM2ttamNzNzl0NXdpIn0.j6VHYxZhvryvOkM2xF3rMg"

const path=require("path")
const x=path.join(__dirname, "../public")
app.use(express.static(x))


app.set('view engine', 'hbs')

app.get('/', (req,res)=>{
    res.render('index',{
        title:"HomePage"
    })
})
request({url:weatherURL,json:true}, (error, response)=>{
    request({url:geoCodeURL,json:true}, (er, resp)=>{
        app.get('/weather', (req,res)=>{
            res.render('weather',{
                CountryName:response.body.location.name,
                CountryWeather:response.body.current.condition.text,
                CountryTemp:response.body.current.temp_c,
                latitude:resp.body.features[0].center[0],
                longitude:resp.body.features[0].center[1],
            })
        })
    })

})
const viewDirectory=path.join(__dirname, "../temp1/views")

app.set("views", viewDirectory)

//////////////////////////////////////////////////////////////////////////////////
var hbs=require('hbs')
const { url } = require('inspector')
const partialPath=path.join(__dirname, "../temp1/partials")
hbs.registerPartials(partialPath)



app.listen(port,()=>{
    console.log(`example of listening to port number ${port}`)
})