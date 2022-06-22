import mongoose from "mongoose"

const Schema = mongoose.Schema

const mealSchema = new Schema({
  name: String
}, {
  timestamps: true
})



export{
  Meal
}