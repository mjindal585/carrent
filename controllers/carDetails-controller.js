const Car = require('mongoose').model('Car')
const User = require('mongoose').model('User')
const RentedCarInfo = require('mongoose').model('RentedCarInfo')

module.exports = {
    viewDetails: (req, res) => {
        let id = req.params.id
        Car.findById(id).then(foundCar => {
            res.render('carDetails', { foundCar })
        })
    },
    delcar : (req , res) =>{
        Car.findByIdAndRemove(req.params.id, (err, todo) => {
            // As always, handle any potential errors:
            if (err) return res.status(500).send(err);
            // We'll create a simple object to send back with a message and the id of the document that was removed
            // You can really do this however you want, though.
            const response = {
                message: "Car successfully deleted",
                id: todo._id
            };
            console.log(response);
            res.redirect('/');})
    },
    takeCar: (req, res) => {
        let id = req.body.carId
        let userId = req.user._id   
        let RentedCarInfoObj = {}   

        Car.findById(id).then(foundCar => {
            User.findById(userId).then(user => {
                user.rentedCars.push(foundCar._id)
                user.save().then(()=>{
                    foundCar.isRendet = true
                    foundCar.save().then(()=>{
                        RentedCarInfoObj={
                            car: foundCar._id,
                            user: userId,
                            dateissue: req.body.dateOfRental,
                            datereturn: req.body.daysOfRental
                        }
                        console.log(RentedCarInfoObj)
                        RentedCarInfo.create(RentedCarInfoObj).then(()=>{
                            res.redirect('/')
                        })
                    })
                })
            })
        })  
    }
}

