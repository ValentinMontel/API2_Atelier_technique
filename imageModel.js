const { v4: uuidv4 } = require('uuid')

/**
 * It is the data model for images
 */
class ImageModel{
    constructor(_lat, _lng, _city, _country){
        this.filename = uuidv4()
        this.url = `./images/${this.filename}.png`
        this.date = new Date()
        this.geometry = { 
            lat : _lat, 
            lng : _lng 
        }
        this.city = _city
        this.country = _country
    }
}


module.exports['ImageModel'] = ImageModel