const Car = require('mongoose').model('Car')

module.exports = {
    index: (req, res) => {
        
        Car.find({}).where('isRendet').equals(false).then(allCar => {
                        
            res.render('home/index', { allCar })
        })
    },
    searchingModel: (req, res) => {
        let searchingModel = req.query.model.toLowerCase()
        let searchedCars = []
        
        Car.find({}).where('isRendet').equals(false).then(allCars => {
            for (let car of allCars) {
                car.model = car.model.toLowerCase()
                let model = car.model.split(/\s+/)
                if (model.indexOf(searchingModel) >= 0) {
                    car.newModel = car.model.replace(/\b\w/g, function(l){ return l.toUpperCase() })
                    searchedCars.push(car)
                }
            }

            res.render('query/searchingModel', { searchedCars })
        })
    },
    about: (req, res) => {
        res.render('home/about');
    },
    contacts: (req, res) => {
        res.render('home/contact');
    }
};