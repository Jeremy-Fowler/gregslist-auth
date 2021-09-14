import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const HouseSchema = new Schema(
  {
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    levels: { type: Number, required: true },
    imgUrl: { type: String, default: '//placehold.it/300x300' },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, minLength: 3 },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
