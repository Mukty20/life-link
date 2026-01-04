import mongoose, { model } from "mongoose";


const DonationSchema = mongoose.Schema({
    fullName: { type: String, },
    bloodType: { type: String, },
    age: { type: String, },
    location: { type: String, },
    phone: { type: String, },
    email: { type: String, },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Hospital'
    },
    hospitalname: { type: String },
    lastDonationDate: { type: Date, },
    healthConditions: { type: String, },
    availability: { type:String, },
    preferredDate: { type: Date, },
    preferredTime: { type: String, },
    emergencyContact: { type: String, },
    emergencyPhone: { type: String, },
    donorId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
},{ timestamps: true })


export default model('Donation', DonationSchema) 