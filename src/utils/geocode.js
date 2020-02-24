const request = require("request")

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoicm9kcmlnb2NoZXR0byIsImEiOiJjazVwemxvM24wMG5xM2RwOTl1NHFkbnpwIn0.hb66RWaqKcIPP42xO_J77g&limit=1"
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location service!')
            return
        }
        if(!body.features || body.features.length == 0) {
            callback('Unable to find location')
            return;
        }
        console.log(body.features)

        const {center, latitude = center[1], longitude = center[0], text: location} = body.features[0]
        callback(undefined, {
            latitude,
            longitude,
            location
        })
    })
}
module.exports = geocode
