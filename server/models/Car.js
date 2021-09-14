import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CarSchema = new Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    imgUrl: { type: String, default: '//placehold.it/300x300' },
    description: { type: String, minLength: 3 },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
