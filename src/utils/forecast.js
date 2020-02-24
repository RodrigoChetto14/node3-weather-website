const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/50c32ede609ac75cb2cd70f6a4dea396/' + latitude + ',' + longitude + '?units=si'
    request({url, json: true}, (error, {body}) => {
        if(error) {
            console.log("Unable to connect to weather service!")
            return;
        }
        if(body.error) {
            console.log('Unable to find location')
            return;
        }
        const {currently, daily, sumary = daily.data[0].summary} = body
        const {temperature, precipProbability} = currently
        callback(undefined, sumary + 'It is currently ' + temperature + ' degrees out. And there is a ' + precipProbability + '% change of rain.')
    })
}
module.exports = forecast
