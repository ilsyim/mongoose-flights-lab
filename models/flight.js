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
      const year = today.getFullYear()
      const month = today.getMonth()
      const day = today.getDate()
      const result = new Date(year + 1, month, day)
      return result
    }
  }, 
}, {
  timestamps: true
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}