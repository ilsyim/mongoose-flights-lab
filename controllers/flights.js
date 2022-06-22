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
    res.redirect('/')
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
    res.redirect('/')
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
    res.redirect('/')
  })
}

function edit (req, res) {
  const editFlight = new Flight()
  console.log('Edit Flight:', newFlight)
  const defaultDate = editFlight.departs
  const formattedDate = defaultDate.toISOString().slice(0,16)
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/edit', {
      flight: flight,
      title: 'Edit Flight',
      departsDate: formattedDate
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function update (req,res) {
  Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function deleteTicket(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets._id.remove()
  })
}

export {
  newFlight as new,
  create,
  index,
  deleteFlight as delete,
  show,
  edit,
  update,
  createTicket,
  deleteTicket
}