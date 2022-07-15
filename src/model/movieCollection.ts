import mongoose from "mongoose"

const movieCollectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  genere: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  }
})

export default mongoose.model('movieCollection', movieCollectionSchema)