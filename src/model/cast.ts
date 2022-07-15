import mongoose from "mongoose"

const castSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  }
})

export default mongoose.model('cast', castSchema)