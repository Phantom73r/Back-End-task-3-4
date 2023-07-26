const request=require("request")
const geoCode=(place,callback)=>{
    const geocodeURL="https://api.mapbox.com/geocoding/v5/mapbox.places/"+place+".json?access_token=pk.eyJ1IjoibWliYm9vIiwiYSI6ImNsa2F6aWs2NjBkNTQzZm80ODBsdDZmbWUifQ.hjgUnmKF1oqeEofG5PcOKA"
    request({url:geocodeURL,json:true }, (error, response)=>{
        if(error){
            callback("Can't reach the website", undefined)
        }
    else if(response.body.message){
        callback(response.body.message, undefined)
    }else if(response.body.features.length==0){
            callback("Can't find the location", undefined)
    }else{
            callback(undefined,{
                longitude:response.body.features[0].center[1],
                latitude:response.body.features[0].center[0]
            })
        }
    })
}
module.exports=geoCode;