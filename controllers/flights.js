import { Flight } from '../models/flight.js'


function newFlight(req, res) {
  const newFlight = new Flight()
  console.log('New Flight:', newFlight)
  const defaultDate = newFlight.departs
  const formattedDate = defaultDate.toISOString().slice(0,16)
  res.render('flights/new', {
    title: 'Add Flight',
    departsDate: formattedDate
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
      title: 'All Flights'
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(error =>{
    console.log(error)
    res.redirect('/flights')
  })
}

function show(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/show', {
      flight: flight,
      title: 'Your Flight'
    })
  })
  .catch(error =>{
    console.log(error)
    res.redirect('/flights')
  })
}

function edit (req, res) {
  const departsDate = function() {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const day = today.getDate()
    const result = new Date(year + 1, month, day)
    return result
  }
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/edit', {
      flight: flight,
      title: 'Edit Flight',
      departsDate
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/fruits')
  })
}

function update (req,res) {
  Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(error => {
    console.log(error)
    res.redirect('/fruits')
  })
}

export {
  newFlight as new,
  create,
  index,
  deleteFlight as delete,
  show,
  edit,
  update
}