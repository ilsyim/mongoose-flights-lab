import { Flight } from '../models/flight.js'


function newFlight(req, res) {
  const departsDate = function() {
    const today = new Date()
    return today(today.setFullYear(today.getFullYear() + 1))
  }
  res.render('flights/new', {
    title: 'ADD FLIGHT',
    departsDate
  })
}

function create(req, res) {
  Flight.create (req.body)
  .then(flight => {
    res.redirect(`/flights`)
  })
  .catch(error =>{
    console.log(error)
    res.redirect('/flights')
  })
}

function index(req, res) {
  Flight.find({})
  .then(flights => {
    res.render('flights/index', {
      flights: flights,
      title: 'ALL FLIGHTS'
    })
  })
}

export {
  newFlight as new,
  create,
  index,
}