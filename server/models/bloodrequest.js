import mongoose, { model } from "mongoose";


const BloodrequestSchema = mongoose.Schema({
    bloodType: { type: String, },
    unit: { type: String, },
    urgency: { type: String, },
    requiredDate: { type: Date, },
    note: { type: String, },
    status: { type: String},
    donors:[{
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    hospital: { type: String },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Hospital'
    },
    
},{ timestamps: true })


export default model('Bloodrequest', BloodrequestSchema)