import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const JobSchema = new Schema(
  {
    make: { type: String, required: true },
    company: { type: String, required: true },
    jobTitle: { type: Number, required: true },
    hours: { type: Number, required: true },
    rate: { type: Number, required: true },
    description: { type: String, minLength: 3 },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
