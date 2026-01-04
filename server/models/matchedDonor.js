import mongoose, { model } from "mongoose";


const MatchedSchema = mongoose.Schema({
    
    reqId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Bloodrequest'
    },
    donorId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
},{ timestamps: true })


export default model('Matched', MatchedSchema)