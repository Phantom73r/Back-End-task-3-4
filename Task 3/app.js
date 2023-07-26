const forecast=require("./functions/forecast")
// const request=require("request")
const geoCode=require("./functions/geocode")

const country=process.argv[2]
geoCode(country, (error,data)=>{
    console.log("Error:" , error)
    console.log("Data: ", data)
    if(data){ 
        forecast(data.latitude, data.longitude, (error, data)=>{
        console.log("Error:" , error)
        console.log("Data: ", data)
    })}else{
        console.log("error, you don't have data")
    }
 
})