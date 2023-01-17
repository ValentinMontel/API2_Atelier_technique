const fetch = require('node-fetch-commonjs')
const fs = require('fs')

const developmentMode = false

var url = "http://localhost:5000"
if(!developmentMode){
    url = "https://api-atelier-technique.vercel.app"
}

const RADIUS = 200
const GEOMETRY = {
    lat : 40.4167754,
    lng : -3.7037902
}

let deployementTest = new class DeployementTest {
    constructor() {}

    addImage(nameFileToAdd){
        fetch(`${url}/images/add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    lat : GEOMETRY.lat ,
                    lng : GEOMETRY.lng ,
                    image : fs.readFileSync(`./${nameFileToAdd}.png`)
                }
            )
        })
        .then(res => res.text())
        .then(res => console.log(
            "-----------------------\n"+
            "ADD IMAGE\n" +
            "-----------------------\n" +
            res + "\n"
        ))
    }

    searchByCity(city, radius){
        fetch(`${url}/images/city_filter/${city}/${radius}`)
        .then(res => res.text())
        .then(res => console.log(
            "-----------------------\n"+
            `SEARCH BY CITY : ${city} AND RADIUS : ${radius}\n` +
            "-----------------------\n" +
            res + "\n"
        ))
    }

    searchByCountry(country, radius){
        fetch(`${url}/images/country_filter/${country}/${radius}`)
        .then(res => res.text())
        .then(res => console.log(
            "-----------------------\n"+
            `SEARCH BY COUNTRY : ${country} AND RADIUS : ${radius}\n` +
            "-----------------------\n" +
            res + "\n"
        ))
    }

    getAllWithLatLng(lat, lng, radius){
        fetch(`${url}/images/radius_filter/${lat}/${lng}/${radius}`)
        .then(res => res.text())
        .then(res => console.log(
            "-----------------------\n"+
            `SEARCH BY LATLNG : ${lat},${lng} AND RADIUS : ${radius}\n` +
            "-----------------------\n" +
            res + "\n"
        ))
    }

    getAll(){
        fetch(`${url}/images/all`)
        .then(res => res.text())
        .then(res => console.log(
            "-----------------------\n"+
            "GET ALL IMAGES\n" +
            "-----------------------\n" +
            res + "\n"
        ))
    }
}


deployementTest.addImage("imageTest")
deployementTest.getAll()
deployementTest.getAllWithLatLng(GEOMETRY.lat, GEOMETRY.lng, RADIUS)
deployementTest.searchByCity("Marseille",RADIUS)
deployementTest.searchByCountry("Etat-Unis", RADIUS)
deployementTest.searchByCity("Nice", RADIUS)
deployementTest.searchByCountry("France", RADIUS)

