import mongoose from "mongoose"

const Schema = mongoose.Schema

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United' ]
  },
  airport: {
    type: String,
    enum: ['AUS', 'DEN', 'DFW', 'LAX', 'SAN' ],
  },
  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999
  },
  departs: {
    type: Date,
    // date set to a year from now, !! come back !!
    default: function() {
      const today = new Date()
      const oneYear = today.getFullYear() + 1
      today.setFullYear(oneYear)
      return today
      // return new Date(new Date().setFullYear(new Date().getFullYear() + 1 ))
    }
  }, 
}, {
  timestamps: true
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}