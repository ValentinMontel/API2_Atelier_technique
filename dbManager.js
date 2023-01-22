
const fs = require('fs')
const fetch = require('node-fetch-commonjs')
const { ImageModel } = require('./imageModel.js')
const { sqrt, sin, cos, acos, abs } = require('mathjs')
const pi = 3.14159265358979323846264338327950288419716939937510582


/**
 * These is the database interface class
 */
const dbManager = new class DbManager {
  /**
   * The constructor
   */
  constructor() {
    this.params = {
      access_key: 'AIzaSyCwtN-3et4XEgSNZHGnz8jFP1jlDUQnpHg'
    }
  }
  
  /**
   * 
   * @param {Integer} lat 
   * @param {Integer} lng 
   * @param {Integer} radius 
   * @returns the filtered list of ImageModel on defined radius 
   */
  getImagesWithLatLng(lat, lng, radius){
    return JSON.parse(
      fs.readFileSync('./bd.json', 'utf8'))["Images"].filter(
        image => 
          this.calculDistance(
            [lat, lng], 
            [image.geometry.lat, image.geometry.lng]
          ) <= radius 
      )
  }

  /**
   * 
   * @returns all images of the database
   */
  getAllImages(){
    return JSON.parse(fs.readFileSync('./bd.json', 'utf8'))["Images"]
  }

  /**
   * 
   * @returns the number of items on the database
   */
  getBdSize(){
    return JSON.parse(fs.readFileSync('./bd.json', 'utf8'))["Images"].length - 1
  }

  /**
   * 
   * @param {String} _country 
   * @returns all images were taken in the country parameter
   */
  getImageWithCountryFilter(_country){
    return this.getAllImages().filter(image => image.country == _country)
  }

  /**
   * 
   * @param {int} _id 
   * @returns state of the process
   */
  deleteImage(_id){
    let old = this.getAllImages()
    let tmp = old.filter(image => image.id != _id)
    if(tmp.length == old.length){
      return "id non trouvé"
    } else {
      fs.writeFileSync( 
        "./bd.json",
        JSON.stringify({ "Images": tmp  }), 
        (err) => { if (err) {return false}}
      )
      return true
    }
  }


  /**
   * 
   * @param {ImageModel} image 
   * @returns nothing
   * 
   * To save a pictures in the ./images directory and update database adding the new image
   */
  addImage(lat, lng, data, city, country){
    //Turned data into ImageModel
    const image = new ImageModel(lat, lng, city, country)

    //Save the image picture at ./images
    let buffer = Buffer.from(data, 'base64')
    fs.writeFile(image.url, 
      buffer, 
      (err) => { if (err) {return false}}
    )

    //Get the content of database and add it the new image
    image.id = this.getBdSize()+1
    let tmp = this.getAllImages()
    tmp[image.id] = image

    //Update the database
    fs.writeFileSync( 
      "./bd.json",
      JSON.stringify({ "Images": tmp  }), 
      (err) => { if (err) {return false}}
    )
    return true
  }

  /**
   * 
   * @param { [Integer](2) } cord1 
   * @param { [Integer](2) } cord2 
   * @returns an integer that is a distance between two coordinates
   * 
   */
  calculDistance(cord1, cord2) {
    var radlat1 = Math.PI * cord1[0]/180
    var radlat2 = Math.PI * cord2[0]/180
    var theta = cord1[1]-cord2[1]
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    
    if (dist > 1) { dist = 1 }
      
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    console.log(parseInt(dist * 1.609344))
    return parseInt(dist * 1.609344)
}


  /**
   * 
   * @param {String} address 
   * @returns the LatLng of parameter
   */
  async AdressToLatlng(address){
    const reponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.params.access_key}`)
    const data = await reponse.json()
    return data
  }

  /**
   * 
   * @param { { Double, Double }} LatLng 
   * @returns the city and the country of LatLng parameter
   */
  async LatlngToAdress(LatLng){
    const reponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${LatLng.lat},${LatLng.lng}&key=${this.params.access_key}`)
    const data = await reponse.json()
    return data
  }     
}


module.exports['dbManager'] = dbManager