const express = require('express')
const dbManagerObject = new require('./dbManager.js').dbManager

const API = express()

API.use(express.json())

API.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Max-Age', "1800")
    res.setHeader('Access-Control-Allow-Headers', 'X-XSRF-Token-Origin, X-Requested-With, Content, Accept, Accept-Version')
    res.setHeader('Access-Control-Alllow-Methods', 'GET, POST')
    next()
})

API.use('/image', express.static('images'))

API.use(express.urlencoded({ extended: true }))

API.get('/images/radius_filter/:lat/:lng/:radius', (req, res, next)=>{
    res.json({ images : dbManagerObject.getImagesWithLatLng(req.params.lat, req.params.lng, req.params.radius)})
    //res.end()
})

API.get('/images/all', (req, res, next)=>{
    res.json({ images : dbManagerObject.getAllImages()})
    //res.end()
})

API.post('/images/add', (req, res, next)=>{
    if(req.body.lat == undefined|| req.body.lng == undefined|| req.body.image.data == undefined){
        res.status(200).json("Erreur : données non conforme") 
    }
    dbManagerObject.LatlngToAdress({lat : req.body.lat, lng : req.body.lng}).then(function(result){
        const formatted_address = result.plus_code.compound_code
        const city = formatted_address.substring(formatted_address.split(' ')[0].length).split(',')[0].substring(1)
        const country = formatted_address.split(' ')[formatted_address.split(' ').length-1]
        res.json({ reponse : dbManagerObject.addImage(req.body.lat, req.body.lng, req.body.image.data, city, country) })
    })
    //res.end()
})

API.get('/images/city_filter/:city/:radius', (req, res, next)=>{
    dbManagerObject.AdressToLatlng(req.params.city).then(function(result){
        const latlng = result.results[0].geometry.location
        res.json({ images : dbManagerObject.getImagesWithLatLng(latlng.lat, latlng.lng, req.params.radius) })
        console.log(`${req.params.city} : ${latlng.lat}, ${latlng.lng}`) 
    })
    //res.end()
})

API.get('/images/country_filter/:country/:radius', (req, res, next)=>{
    dbManagerObject.AdressToLatlng(req.params.country).then(function(result){
        const latlng = result.results[0].geometry.location
        res.json({ images : dbManagerObject.getImagesWithLatLng(latlng.lat, latlng.lng, req.params.radius) })
        console.log(`${req.params.country} : ${latlng.lat}, ${latlng.lng}`) 
    })
    //res.end()
})

API.listen(5000, ()=>{
    console.log("API démarrée")
})

module.exports = API