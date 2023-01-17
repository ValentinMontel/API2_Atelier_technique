const fetch = require('node-fetch-commonjs')
const fs = require('fs')

const developmentMode = true

var url = "http://localhost:5000"
if(!developmentMode){
    url = "https://api-2-atelier-technique-geodecouverte.vercel.app"
}

const RADIUS = 200
const datas = {
    inde : {
        geometry : {
            lat : 20.593684,
            lng : 78.962880
        }
    },
    mexique : {
        geometry : {
            lat : 23.634501,
            lng : -102.552784
        }
    },
    marseille : {
        geometry : {
            lat : 43.296482,
            lng : 5.36978
        }
    },
    nice : {
        geometry : {
            lat : 43.7101728,
            lng : 7.2619532
        }
    },
    antibes : {
        geometry : {
            lat : 43.5806503296,
            lng : 7.12767219543
        }
    }
}

let deployementTest = new class DeployementTest {
    constructor() {}

    addImage(nameFileToAdd, _lat, _lng){
        fetch(`${url}/images/add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    lat : _lat ,
                    lng : _lng ,
                    image : fs.readFileSync(`./data/${nameFileToAdd}.png`)
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


deployementTest.addImage("mexique", datas.mexique.geometry.lat, datas.mexique.geometry.lng)
deployementTest.addImage("inde", datas.inde.geometry.lat, datas.inde.geometry.lng)
deployementTest.addImage("antibes", datas.antibes.geometry.lat, datas.antibes.geometry.lng)
deployementTest.addImage("marseille", datas.marseille.geometry.lat, datas.marseille.geometry.lng)
deployementTest.addImage("nice", datas.nice.geometry.lat, datas.nice.geometry.lng)
deployementTest.addImage("nice2", datas.nice.geometry.lat, datas.nice.geometry.lng)
/*deployementTest.getAll()
deployementTest.getAllWithLatLng(datas.inde.geometry.lat, datas.inde.geometry.lng, RADIUS)
deployementTest.searchByCity("Marseille",RADIUS)
deployementTest.searchByCountry("Etat-Unis", RADIUS)
deployementTest.searchByCity("Nice", RADIUS)
deployementTest.searchByCountry("France", RADIUS)
*/
